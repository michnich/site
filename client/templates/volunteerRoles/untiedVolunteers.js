Template.untiedVolunteers.onCreated(function() {
	Meteor.subscribe("untiedVolunteers");
})

Template.untiedVolunteers.helpers({
	volunteers: function() {
		return Volunteers.find();
	}
})