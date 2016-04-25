Template.editPermissionItem.onCreated(function() {
	Session.set("permission", "");
})

Template.editPermissionItem.events({
	'click .remove':function(e) {
		var permission = e.currentTarget.id;
		Session.set("permission", permission);
	},

	'click .confirmDelete': function(e) {
		var volunteerRole = Session.get("volunteerRole");
		console.log(volunteerRole);
		var roleId = VolunteerRoles.findOne({name: volunteerRole})._id;
		console.log(roleId);
		var permission = Session.get("permission");
		console.log(permission);
		VolunteerRoles.update(roleId, {$pull: {permissions: permission}});

		var appliedPermissions = VolunteerRoles.findOne({name: volunteerRole}).permissions;
		Session.set('permissions', appliedPermissions);
		var allRoles = _.pluck(Meteor.roles.find().fetch(), 'name');
		var unappliedPermissions = _.difference(allRoles, appliedPermissions);
		Session.set("unappliedPermissions", unappliedPermissions); 
	}
})