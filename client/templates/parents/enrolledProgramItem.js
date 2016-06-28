Template.enrolledProgramItem.helpers({
  timeFormat: function(timeString) {
      return moment().hour(timeString).minute(0).format("hh:mm a");
  },
});

Template.enrolledProgramItem.events({
  'click .close': function() {
    var programs = Session.get("enrolledPrograms");
    Session.set("enrolledPrograms", _.without(programs, this._id));
  }
})
