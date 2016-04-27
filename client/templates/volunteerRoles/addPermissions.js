Template.addPermissions.onCreated(function() {
	Meteor.subscribe("volunteerRoles");
	Meteor.subscribe("roles");
	Session.set("message", "");
	Session.set("messageClass", "");
});

Template.addPermissions.helpers({
	message: function(field) {
		return Session.get("message");
	},
	messageClass: function(field) {
		return Session.get("messageClass");
	}
})

Template.addPermissions.events({
	'submit form': function(e) {
		e.preventDefault();
		var permission = $(e.target).find('[name=permission]').val();
		var roleExists = Meteor.roles.findOne({name: permission});
		if (!_.isEmpty(roleExists)) {
			Session.set("message", "That permission already exists");
			Session.set("messageClass", "has-error");
		}
		else {
			var volunteerRoles = $('input[name=volunteerType]:checked').map(function() {return this.value;}).get();
			volunteerRoles.push('Super Admin');
			Meteor.call("createPermission", permission);
			var x;
			for (x = 0; x < volunteerRoles.length; x++) {
				var roleId = VolunteerRoles.findOne({name: volunteerRoles[x]})._id;
				VolunteerRoles.update(roleId, {$addToSet: {permissions: permission}});
			}
			Session.set("message", "Permission successfully created");	
			Session.set("messageClass", "has-success");
		}
		$(e.target).find('[name=permission]').val("");
		$('input[name=volunteerType]').attr('checked', false);
	}
});