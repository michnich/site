Template.parentDash.onCreated(function() {
  Session.set("parent", "");
});

Template.parentDash.helpers({
    /*actually the dumbest code ever*/
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
