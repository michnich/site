Template.volunteerList.onCreated(function() {
	Meteor.subscribe("allVolunteers");
});

Template.volunteerList.helpers({
	volunteer: function() {
		return Volunteers.find();
	}
})