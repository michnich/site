//called after successful account creation
//sets the users permissions
var assignUserSet = function(userId, volunteer) {
  var volunteerId = volunteer.profile.volunteerId;
  Volunteers.update(volunteerId, {$set: {userId: userId}});
  var volunteerRole = Volunteers.findOne({_id: volunteerId}).type;
  var volunteerGroups = _.toArray(Volunteers.findOne({_id: volunteerId}).program);
  Meteor.call("addUserRole", userId, volunteerRole, volunteerGroups);
};

//redirects user to their dashboard after a sucessful login
var postSignIn = function(error, state) {
  if (!error) {
    if (state == "signIn") {
      if (Meteor.isClient) {
        Router.go('/dashboard');
      }
    }
  }
};

AccountsTemplates.configure({
	postSignUpHook: assignUserSet,
	onSubmitHook: postSignIn
});