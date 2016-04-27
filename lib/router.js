Router.configure({
  layoutTemplate: 'layout'
});

//NAVBAR
Router.route('/', {name: 'home'});
Router.route('/parents', {name: 'parents'})
Router.route('/dashboard', {name: 'dashboard'});
Router.route('/signIn', {name: 'signIn'});
Router.route('/signOut', {
  name: 'signOut',
  onBeforeAction: function () {
    AccountsTemplates.logout();
    Router.go('/');
  }
});

//USERS
Router.route('/createUser', {name: 'createUser'});

//ROLES AND PERMISSIONS
Router.route('/addPermissions', {name: 'addPermissions'});
Router.route('/editRolePermissions', {name: 'editRolePermissions'});

//VOLUNTEERS
Router.route('/addVolunteer', {name: 'addVolunteer'});
Router.route('/viewVolunteers', {name: 'volunteerList'});
Router.route('/volunteerProfile/:_id', {
  name: 'volunteerProfile',
  waitOn: function() {
    return Meteor.subscribe('volunteer', this.params._id);
  },
  data: function() {
    return Volunteers.findOne({_id: this.params._id});
  }
});

Router.route('/editVolunteer/:_id', {
  name: 'editVolunteer',
  waitOn: function() {
    return Meteor.subscribe('volunteer', this.params._id);
  },
  data: function() {
    return Volunteers.findOne({_id: this.params._id});
  }
});
