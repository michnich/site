Template.makeAdmin.onCreated(function(){
	Meteor.subscribe("allVolunteers");
});

Template.makeAdmin.helpers({
	volunteer: function() {
		return Volunteers.find();
	}
});

Template.makeAdmin.events({
	'submit form' : function(e) {
		e.preventDefault();
		var volunteerId = $(e.target).find('[name=volunteer]').val();
		Meteor.call("makeUserAdmin", volunteerId);
	}
})