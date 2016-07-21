Template.parentStudentItem.onCreated(function() {
    Meteor.subscribe("programById", {$in: this.program});
});

Template.parentStudentItem.helpers({
    programs: function() {
      return Programs.find();
    }
});
