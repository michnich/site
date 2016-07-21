Template.parentStudentItem.helpers({
    programs: function() {
      Meteor.subscribe("programById", {$in: this.program});
      return Programs.find({_id: {$in: this.program}});
    }
});
