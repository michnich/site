Router.configure({
  layoutTemplate: 'layout'
});

//NAVBAR
Router.route('/', {name: 'home'});
Router.route('/dashboard', {name: 'dashboard'});
Router.route('/signIn', {name: 'signIn'});
Router.route('/signOut', {
  name: 'signOut',
  onBeforeAction: function () {
    AccountsTemplates.logout();
    Router.go('/');
  }
});

//REMOVE LATER
Router.route('/signUp', {name: 'signUp'});

//VOLUNTEERS
Router.route('/addVolunteer', {name: 'addVolunteer'});
