//subscribes to all permissions
Template.dashboard.onCreated(function() {
  Meteor.subscribe('roles');
});
