Router.configure({
    layoutTemplate: 'layout'
});

//before function
//blocks admin only routes, redirects to dashboard for non admins
var adminFilter = function() {
    if (!(Roles.userIsInRole(Meteor.user(), 'admin'))) {
        Router.go('/');
    } else {
        this.next();
    }
};

//waitOn function
//stops userIsInRole from throwing error or temporarily loading the wrong template
var rolesSubscription = function() {
    return Meteor.subscribe('roles');
};

//NAVBAR
Router.route('/', {
    waitOn: rolesSubscription,
    name: 'dashboard'
});
Router.route('/contact', {
    name: 'contactForm'
});
Router.route('/signIn', {
    name: 'signIn'
});
Router.route('/signOut', {
    name: 'signOut',
    onBeforeAction: function() {
        AccountsTemplates.logout();
        Router.go('/');
    }
});

//REQUESTS
Router.route('/requests', {
    name: 'allRequests',
    waitOn: rolesSubscription,
    before: adminFilter
});

//PARENTS
Router.route('/summer-camp-enrollment', {name: 'summerCampEnrollment'});
Router.route('/success', {name: 'registrationSuccessful'});
