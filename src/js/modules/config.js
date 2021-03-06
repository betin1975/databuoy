var Config = {
  data_location: 'data.csv',
  portal_name: 'Data Portal',
  init: function(callback) {
    self = this;
    // Figure out where to get data from based on data_location
    this.initializeDataLocation().done(function(data) {
      if (data !== "") {
        self.setDataLocation(data);
      } else {
        alert("Couldn't find a data location. Check your data_location file.");
      }
      callback();
    });
    // Set portal title
    this.initializePortalName().done(function(data) {
      self.setPortalName(data);
      Utils.setPageTitle(self.getPortalName());
    });
  },
  initializeDataLocation: function() {
    return $.ajax({
             url: "data_location"
           });
  },
  setDataLocation: function(url) {
    this.data_location = url;
    return this.data_location;
  },
  getDataLocation: function() {
    return this.data_location;
  },
  getDataType: function() {
    location_array = this.data_location.split('.');
    extension = location_array[location_array.length - 1].toLowerCase();
    if (Config.isGoogleSheet()) {
      return 'google_sheet';
    } else {
      return extension;
    }
  },
  isGoogleSheet: function() {
    return this.getDataLocation().match('google.com') !== null;
  },
  getPortalName: function() {
    return this.portal_name;
  },
  setPortalName: function(portal_name) {
    this.portal_name = portal_name;
    return this.portal_name;
  },
  initializePortalName: function() {
    return $.ajax({
             url: "portal_name"
           });
  }
};
