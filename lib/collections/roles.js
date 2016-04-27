if (Meteor.isServer) {
	Meteor.publish("roles", function (){
  		return Meteor.roles.find({})
	});
};

Meteor.methods({
	createPermission: function(permission) {
		Roles.createRole(permission);
	}
})