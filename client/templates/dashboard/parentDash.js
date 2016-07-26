Template.parentDash.onCreated(function() {
  this.subscribe("parentByUserId", Meteor.userId());
});

Template.parentDash.helpers({
    students: function() {
        var parent = Session.get("parent");
        Meteor.subscribe("studentsByParent", parent);
        return Students.find();
    },
    completeProfile: function() {
      if (Parents.findOne()) {
        return true;
      }
      else {
        return false;
      }
    },
    parent: function() {
        var parent = Parents.find().fetch();
        Session.set("parent", parent[0]._id);
        return parent;
    }
});
