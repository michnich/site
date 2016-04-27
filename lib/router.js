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
Router.route('/createUser', {
  name: 'createUser',
  waitOn: function() {
    var subscribe = Meteor.subscribe("roles");
    return subscribe;
  },
  onBeforeAction: function() {
    if (!Roles.userIsInRole(Meteor.userId(), 'add_volunteer_user', Roles.GLOBAL_GROUP)) {
      Router.go('/dashboard');
    }
    else {
      this.next();
    }
  }
});

//ROLES AND PERMISSIONS
Router.route('/addPermissions', {name: 'addPermissions',
  waitOn: function() {
    return Meteor.subscribe("roles");
  },
  onBeforeAction: function() {
    if (!Roles.userIsInRole(Meteor.userId(), 'add_role', Roles.GLOBAL_GROUP)) {
      Router.go('/dashboard');
    }
    else {
      this.next();
    }
}});

Router.route('/editRolePermissions', {name: 'editRolePermissions',
  waitOn: function() {
    return Meteor.subscribe("roles"); 
  },
   onBeforeAction: function() {
    if (!Roles.userIsInRole(Meteor.userId(), 'edit_role_permissions', Roles.GLOBAL_GROUP)) {
      Router.go('/dashboard');
    }
    else {
      this.next();
    }
}});
Router.route('/addAdminUser', {name: 'makeAdmin',
  waitOn: function() {
    return Meteor.subscribe("roles"); 
  },
  onBeforeAction: function() {
    if (!Roles.userIsInRole(Meteor.userId(), 'add_admin_user', Roles.GLOBAL_GROUP)) {
      Router.go('/dashboard');
    }
    else {
      this.next();
    }
}});

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

//STUDENTS
Router.route('/addStudent', {name: 'addStudent'});
