Template.parentDash.onCreated(function() {
    Meteor.subscribe("parentByUserId", Meteor.userId());
    var parentId = Parents.find()._id;
    Meteor.subscribe("studentByParent", parentId);
});

Template.parentDash.helpers({
    students: function() {
        return Students.find();
    }
});
