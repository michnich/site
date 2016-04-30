Template.makeAdminModal.onCreated(function(){
	Meteor.subscribe("allVolunteers");
});

Template.makeAdminModal.helpers({
	volunteer: function() {
		return Volunteers.find();
	}
});

Template.makeAdminModal.events({
	'submit form' : function(e) {
		e.preventDefault();
		var volunteerId = $(e.target).find('[name=volunteer]').val();
		Meteor.call("makeUserAdmin", volunteerId);
	}
})