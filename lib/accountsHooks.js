//called after successful account creation
//sets the users permissions
var assignUserSet = function(userId) {
	//will assign user roles here
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