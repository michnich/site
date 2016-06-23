
Template.enrolledProgramItem.helpers({
  summerCamp: function() {
    return (this.program_type === "Summer Camp");
  }
});

Template.enrolledProgramItem.events({
  'click .close': function() {
    var programs = Session.get("enrolledPrograms");
    Session.set("enrolledPrograms", _.without(programs, this._id));
  }
})
