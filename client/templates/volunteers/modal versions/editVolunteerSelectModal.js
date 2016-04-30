Template.editVolunteerSelectModal.onCreated(function() {
	Meteor.subscribe("allVolunteers");
	Session.set("selectedId", "");
});

Template.editVolunteerSelectModal.helpers({
	volunteers: function() {
		return Volunteers.find();
	}
});

Template.editVolunteerSelectModal.events({
	'click #select':function(e) {
		var volunteerId = $(e.target).find('[name=selected]').val();
		Session.set("selectedId", volunteerId);
		$("#closeButton").click(); 
	}
})