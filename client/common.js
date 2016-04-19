Meteor.startup(function () {
  AccountsEntry.config({
    homeRoute: '/',                            // mandatory - path to redirect to after sign-out
    dashboardRoute: '/dashboard',              // mandatory - path to redirect to after successful sign-in
    profileRoute: 'profile',                   // if set adds link to User Profile
    passwordSignupFields: 'USERNAME_AND_OPTIONAL_EMAIL',        // One of 'USERNAME_AND_EMAIL', 'USERNAME_AND_OPTIONAL_EMAIL', 'USERNAME_ONLY', or 'EMAIL_ONLY' (default).
  });
});


isEmpty = function (obj) {   
    if (obj == null) return true;
   
    if (obj.length && obj.length > 0)    return false;
    if (obj.length === 0)  return true;
 
    for (var key in obj) {
        if (hasOwnProperty.call(obj, key)) return false;
    }
 
    return true;
}
