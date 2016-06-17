Router.configure({
  layoutTemplate: 'layout'
});

//NAVBAR
Router.route('/', {name: 'home'});
Router.route('/contactform', {name: 'contactForm'})
Router.route('/parents', {name: 'parents'});
Router.route('/volunteers', {name: 'volunteers'});
Router.route('/educators', {name: 'educators'});
Router.route('/dashboard', {name: 'dashboard'});
Router.route('/signIn', {name: 'signIn'});
Router.route('/signOut', {
  name: 'signOut',
  onBeforeAction: function () {
    AccountsTemplates.logout();
    Router.go('/');
  }
});

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
Router.route('/viewStudents', {name: 'studentList'});
Router.route('/studentProfile/:_id', {
  name: 'studentProfile',
  waitOn: function() {
    return Meteor.subscribe('student', this.params._id);
  },
  data: function() {
    return Students.findOne({_id: this.params._id});
  }
});
Router.route('/editStudent/:_id', {
  name: 'editStudent',
  waitOn: function() {
    return Meteor.subscribe('student', this.params._id);
  },
  data: function() {
    return Students.findOne({_id: this.params._id});
  }
});
Router.route('/studentProgress/:_id', {
  name: 'editStudentLevels',
  waitOn: function() {
    return Meteor.subscribe('student', this.params._id);
  },
  data: function() {
    return Students.findOne({_id: this.params._id});
  }
});

//REQUESTS
Router.route('/requests', {name: 'allRequests'});

//PARENT ENROLLMENT PROCCESS
Router.route('/completeProfile', {name: 'addParentProfile'});
Router.route('/enrollStudent', {name: 'parentAddStudent'});
Router.route('/editProfile', {name: 'editParentProfile'});
