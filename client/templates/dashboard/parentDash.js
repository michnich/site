//subscribes to parent and student data based on tied user id
Template.parentDash.onCreated(function() {
  this.subscribe("parentByUserId", Meteor.userId());
  this.subscribe("studentsByUser", Meteor.userId());
});

Template.parentDash.helpers({
    /*returns all students tied to the logged in user*/
    students: function() {
        return Students.find({parentUserId: Meteor.userId()});
    },
    /*if the logged in user doesn't have a tied parent document, they didn't complete the profile on signup
      will show a "complete profile" link for those users*/
    completeProfile: function() {
      if (Parents.findOne({userId: Meteor.userId()})) {
        return true;
      }
      else {
        return false;
      }
    },
    /*returns parent document tied to logged in user account*/
    parent: function() {
        var parent = Parents.find({userId: Meteor.userId()}).fetch();
        Session.set("parent", parent[0]._id);
        return parent;
    }
});
