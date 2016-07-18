Template.parentDash.onCreated(function() {
  Meteor.subscribe("parentByUserId", Meteor.userId());
});

Template.parentDash.helpers({
    students: function() {
        var parent = Session.get("parent");
        Meteor.subscribe("studentsByParent", parent);
        return Students.find();
    },
    parents: function() {
        var parent = Parents.find().fetch();
        Session.set("parent", parent[0]._id);
        return parent;
    }
});
