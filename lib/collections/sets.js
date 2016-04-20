Sets = new Mongo.Collection('sets');

Meteor.methods({
	addPermissionToSet: function(permissionName, setId) {
		Sets.update(setId, {$addToSet: {permissions: permissionName}});
	},

	removePermissionFromSet: function(permissionName, set) {
		Sets.update(setId, {$pull: {permissions: permissionName}});
	},

	assignUserSet: function(userId, group, setId) {
		var permissions = Sets.fetch({_id: setId}).permissions;
		Roles.addUsersToRoles(userId, permissions, group);
	},

	removeUserSet: function(userId, group, setId) {
		var permissions = Sets.fetch({_id: setId}).permissions;
		Roles.removeUsersFromRoles(userId, permissions, group);
	}
})