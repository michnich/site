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
    waitOn: function() {
      return [
        rolesSubscription,
        function() {
          if (Roles.userIsInRole(Meteor.user(), 'parent', 'Parents')) {
            return Meteor.subscribe("parentByUserId", Meteor.userId());
          }
        }
      ]
    },
    data: function() {
      return Parents.findOne({userId: Meteor.userId()});
    },
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

//SUMMER CAMP 2016
Router.route('/summer-camp-enrollment', {name: 'summerCampEnrollment'});
Router.route('/success', {name: 'registrationSuccessful'});

//PARENTS
Router.route('/completeProfile', {name: 'addParentProfile'});
Router.route('/enrollStudent', {name: 'parentAddStudent'});
Router.route('/editProfile', {
  name: 'editParentProfile',
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
