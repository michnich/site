Template.editRolePermissions.onCreated(function() {
	Meteor.subscribe("volunteerRoles");
	Meteor.subscribe("roles");
	Session.set("volunteerRole", "");
	Session.set('permissions', []);
	Session.set('unappliedPermissions', []);
});

Template.editRolePermissions.helpers({
	appliedPermissions: function(){
		return Session.get("permissions");
	},

	unappliedPermissions: function(field) {
		return Session.get("unappliedPermissions");
	}
});

Template.editRolePermissions.events({
	'change #type': function(e) {
		var volunteerRole = $(e.target).val();
		Session.set("volunteerRole", volunteerRole);
		var appliedPermissions = VolunteerRoles.findOne({name: volunteerRole}).permissions;
		Session.set('permissions', appliedPermissions);
		var allRoles = _.pluck(Meteor.roles.find().fetch(), 'name');
		var unappliedPermissions = _.difference(allRoles, appliedPermissions);
		Session.set("unappliedPermissions", unappliedPermissions); 
	},
	'submit form':function(e) {
		e.preventDefault();
		var volunteerRole = Session.get("volunteerRole");
		var newPermission = $(e.target).find('[name=newPermission]').val();
		var roleId = VolunteerRoles.findOne({name: volunteerRole})._id;
		VolunteerRoles.update(roleId, {$addToSet: {permissions: newPermission}});

		var appliedPermissions = VolunteerRoles.findOne({name: volunteerRole}).permissions;
		Session.set('permissions', appliedPermissions);
		var allRoles = _.pluck(Meteor.roles.find().fetch(), 'name');
		var unappliedPermissions = _.difference(allRoles, appliedPermissions);
		Session.set("unappliedPermissions", unappliedPermissions);
	}
});