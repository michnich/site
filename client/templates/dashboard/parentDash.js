Template.parentDash.onCreated(function() {
  this.subscribe("parentByUserId", Meteor.userId());
  this.subscribe("studentsByUser", Meteor.userId());
});

Template.parentDash.helpers({
    students: function() {
        return Students.find({parentUserId: Meteor.userId()});
    },
    completeProfile: function() {
      if (Parents.findOne({userId: Meteor.userId()})) {
        return true;
      }
      else {
        return false;
      }
    },
    parent: function() {
        //var parent = Parents.find().fetch();
        //Session.set("parent", parent[0]._id);
        var parent = Parents.find({userId: Meteor.userId()}).fetch();
        Session.set("parent", parent[0]._id);
        return parent;
    }
});
