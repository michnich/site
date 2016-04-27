AccountsTemplates.configure({
    // Behavior
    confirmPassword: true,
    enablePasswordChange: true,
    forbidClientAccountCreation: false,
    overrideLoginErrors: true,
    sendVerificationEmail: false,
    lowercaseUsername: false,
    focusFirstInput: true,

    // Appearance
    showAddRemoveServices: false,
    showForgotPasswordLink: true,
    showLabels: true,
    showPlaceholders: true,
    showResendVerificationEmailLink: false,
    hideSignInLink: true,
    hideSignUpLink: true,

    // Client-side Validation
    continuousValidation: false,
    negativeFeedback: false,
    negativeValidation: true,
    positiveValidation: true,
    positiveFeedback: true,
    showValidating: true,

    // Privacy Policy and Terms of Use
    //privacyUrl: 'privacy',
    //termsUrl: 'terms-of-use',

    // Redirects
    homeRoutePath: '/',
    redirectTimeout: 4000,

    // Texts
    texts: {
      button: {
          signUp: "Register User"
      },
      socialIcons: {
          "meteor-developer": "fa fa-rocket"
      },
      title: {
          forgotPwd: "Forgot Password?"
      },
    },
});

AccountsTemplates.addField({
  _id: 'volunteerId',
  displayName: "Volunteer",
  type: 'select',
  template: "untiedVolunteers",
  required: true,
  func: function (volunteerName) {
      if (Meteor.isServer){
        if (volunteerName != null)
            return false; //meaning no error
        return true; // Validation error!
      }
  },
  errStr: 'Please select a volunteer to tie the account to',
});


