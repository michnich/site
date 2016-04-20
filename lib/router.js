Router.configure({
  layoutTemplate: 'layout'
});

Router.route('/', {name: 'home'});

Router.route('/dashboard', {name: 'dashboard'});

Router.route('/addVolunteer', {name: 'addVolunteer'});

