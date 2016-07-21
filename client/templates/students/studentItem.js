Template.studentItem.helpers({
    adminAdd: function(parent) {
      if ((_.isEmpty(parentId)) || (parentId = "admin")) {
        return true;
      }
      else {
        return false;
      }
    },
    emergency: function(parent) {
      Meteor.subscribe("parentById", parentId);
      return Parents.find();
    }
});
