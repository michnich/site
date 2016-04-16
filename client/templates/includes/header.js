Template.header.events({
    'click .logout': function(event){
        Meteor.logout();
        Router.go('posts');
    }
});
