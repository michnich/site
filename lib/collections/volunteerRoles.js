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
	addUserRole: function(userId, volunteerRole, groups) {
		var volunteerPermissions = _.toArray(VolunteerRoles.findOne({name: volunteerRole}).permissions);
		var x;
		for (x = 0; x < groups.length; x++) {
			Roles.addUsersToRoles(userId, volunteerPermissions, groups[x]);
		}
	},
	makeUserAdmin: function(volunteerId) {
		var userId = Volunteers.findOne({_id: volunteerId}).userId;
		var volunteerPermissions = _.toArray(VolunteerRoles.findOne({name: "Admin"}).permissions);
		Roles.addUsersToRoles(userId, volunteerPermissions, Roles.GLOBAL_GROUP);
	}
});