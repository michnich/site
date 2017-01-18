Template.enrolledProgramItem.helpers({
  //formats the time into a string
  timeFormat: function(timeString) {
      return moment().hour(timeString).minute(0).format("hh:mm a");
  },
});

Template.enrolledProgramItem.events({
  //unselects a program to enroll in for the student
  'click .close': function() {
    var programs = Session.get("enrolledPrograms");
    Session.set("enrolledPrograms", _.without(programs, this._id));
  }
})
