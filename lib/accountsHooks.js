var setPermissions = function(userId, info) {
  var accountType = info.profile.accountType;
  Roles.addUsersToRoles(userId, accountType, "Parents");
  //Volunteers.update(volunteerId, {$set: {userId: userId}});
  //var volunteerRole = Volunteers.findOne({_id: volunteerId}).type;
  //var volunteerGroups = _.toArray(Volunteers.findOne({_id: volunteerId}).program);
  //Meteor.call("addUserRole", userId, volunteerRole, volunteerGroups);
};

var postSignIn = function(error, state) {
  if (!error) {
    if (state == "signIn") {
      if (Meteor.isClient) {
        Router.go('dashboard');
      }
    }
    else {
      if (Meteor.isClient){
          Router.go('addParentProfile');
      }
    }
  }
};

AccountsTemplates.configure({
	postSignUpHook: setPermissions,
	onSubmitHook: postSignIn
});
