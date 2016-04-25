VolunteerRoles = new Mongo.Collection("volunteerRoles");

if (Meteor.isServer) {
  Meteor.publish("volunteerRoles", function(){
    return VolunteerRoles.find();
  })
};

VolunteerRoles.allow({
	update: function(id, update) {
		return id;
	}
})

Meteor.methods({
	addPermissionToRole: function(permissionName, setId) {
		VolunteerRoles.update(setId, {$addToSet: {permissions: permissionName}});
	},

	removePermissionFromRole: function(permissionName, set) {
		VolunteerRoles.update(setId, {$pull: {permissions: permissionName}});
	},

	/*assignUserSet: function(userId, group, setName) {
		var permissions = Sets.fetch({name: setName}).permissions;
		Roles.addUsersToRoles(userId, permissions, group);
	},*/

	removeUserRole: function(userId, group, setName) {
		var permissions = VolunteerRoles.fetch({_id: setId}).permissions;
		Roles.removeUsersFromRoles(userId, permissions, group);
	}
});