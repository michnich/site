Template.allRequests.onCreated(function() {
	Meteor.subscribe("allRequests");
});

Template.allRequests.helpers({
	requests: function() {
		return InfoRequests.find();
	}
});
