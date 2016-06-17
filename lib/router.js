Router.configure({
    layoutTemplate: 'layout'
});

var adminFilter = function () {
  if (!(Roles.userIsInRole(Meteor.user(), 'admin'))) {
    Router.go('/');
  }
  else {
    this.next();
  }
};

//NAVBAR
Router.route('/', {
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
  waitOn: function() {
    return Meteor.subscribe('roles');
  },
  before: adminFilter});
