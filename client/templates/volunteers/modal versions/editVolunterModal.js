Template.editVolunteerModal.onCreated(function() {
	var volunteerId = Session.get("selectedId");
	Meteor.subscribe("volunteer", volunteerId);
	Session.set('volunteerErrors', {});
});

Template.editVolunteerModal.helpers({
  errorMessage: function(field) {
    return Session.get('volunteerErrors')[field];
  },
  errorClass: function(field) {
    return !!Session.get('volunteerErrors')[field] ? 'has-error' : '';
  },

  isInGroup: function(program) {
  	if (_.indexOf(this.program, program) != -1) {
  		return true;
  	}
  	else {
  		return false;
  	}
  }
});