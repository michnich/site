Template.volunteerListModal.onCreated(function() {
	Meteor.subscribe("allVolunteers");
	Session.set('selectedVolunteer', {});
});

Template.volunteerListModal.helpers({
	volunteer: function() {
		return Volunteers.find();
	},
	selectedVolunteer: function() {
		return Session.get('selectedVolunteer');
	}
})