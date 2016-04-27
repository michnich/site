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
	}
});