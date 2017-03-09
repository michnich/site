Router.configure({
    layoutTemplate: 'layout'
});

//before function
//blocks admin only routes, redirects to dashboard for non admins
var adminFilter = function() {
    if (!(Roles.userIsInRole(Meteor.user(), 'admin', Roles.GLOBAL_GROUP))) {
        Router.go('/');
    } else {
        this.next();
    }
};

//before function
//check if logged in user is parent
var parentFilter = function() {
  if (!(Roles.userIsInRole(Meteor.user(), 'parent', 'Parents'))) {
    Router.go('/')
  }
  else {
    this.next();
  }
}

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

Router.route('/reset-password:_token', {
	name: 'resetPwd',
});

/*Accounts.urls.resetPwd = function(token){
  return Meteor.absoluteUrl("reset-password/" + token);
};*/

//REQUESTS
Router.route('/requests', {
    name: 'allRequests',
    waitOn: rolesSubscription,
    before: adminFilter
});

//SUMMER CAMP 2016
Router.route('/summer-camp-enrollment', {name: 'summerCampEnrollment'});
Router.route('/success', {name: 'registrationSuccessful'});

//PARENTS
Router.route('/completeProfile', {
  name: 'addParentProfile',
  waitOn: function() {
    if (!Meteor.userId()) {
      Router.go('/signIn');
    }
    else {
      return Meteor.subscribe("parentByUserId", Meteor.userId());
    }
  },
  before: function () {
    var parent = Parents.findOne({userId: Meteor.userId()});
    if (_.isEmpty(parent)) {
      this.next();
    }
    else {
      Router.go("/editProfile");
    }
  }
});
Router.route('/enrollStudent', {
  name: 'parentAddStudent',
  before: parentFilter
});
Router.route('/editProfile', {
  name: 'editParentProfile',
  before: parentFilter,
  waitOn: function() {
    return Meteor.subscribe("parentByUserId", Meteor.userId());
  },
  data: function() {
    return Parents.findOne({});
  }
})

//STUDENTS
Router.route('/viewStudents', {name: 'studentList'});
Router.route('/studentProfile/:_id', {
  name: 'studentProfile',
  before: function() {
    if (Roles.userIsInRole(Meteor.user(), 'parent', 'Parents')) {
      var student = Students.findOne({_id: this.params._id});
      var parent = Parents.findOne({userId: Meteor.userId()});
      if (student.parentId === parent._id) {
        this.next();
      }
      else {
        Router.go('/');
      }
    }
    else if (Roles.userIsInRole(Meteor.user(), 'admin', Roles.GLOBAL_GROUP)) {
      this.next();
    }
    else {
     Router.go('/');
    }
  },
  waitOn: function() {
    if (Roles.userIsInRole(Meteor.user(), 'parent', 'Parents')) {
      return [Meteor.subscribe('student', this.params._id), Meteor.subscribe("parentByUserId", Meteor.userId())];
    }
    else {
      return Meteor.subscribe('student', this.params._id);
    }
  },
  data: function() {
    return Students.findOne({_id: this.params._id});
  }
});

//move this parent/admin check to a function
Router.route('/editStudent/:_id', {
  name: 'editStudent',
  before: function() {
    if (Roles.userIsInRole(Meteor.user(), 'parent', 'Parents')) {
      var student = Students.findOne({_id: this.params._id});
      var parent = Parents.findOne({userId: Meteor.userId()});
      if (student.parentId === parent._id) {
        this.next();
      }
      else {
        Router.go('/');
      }
    }
    else if (Roles.userIsInRole(Meteor.user(), 'admin', Roles.GLOBAL_GROUP)) {
      this.next();
    }
    else {
     Router.go('/');
    }
  },
  waitOn: function() {
    if (Roles.userIsInRole(Meteor.user(), 'parent', 'Parents')) {
      return [Meteor.subscribe('student', this.params._id), Meteor.subscribe("parentByUserId", Meteor.userId())];
    }
    else {
      return Meteor.subscribe('student', this.params._id);
    }
  },
  data: function() {
    return Students.findOne({_id: this.params._id});
  }
});

//for admins to add students
Router.route('/addStudent', {
  name: 'addStudent',
  waitOn: rolesSubscription,
  before: adminFilter
});

//DONATE
Router.route('/donate', {
  name: 'donate'
});