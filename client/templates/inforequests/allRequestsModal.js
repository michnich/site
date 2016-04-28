Template.allRequestsModal.onCreated(function() {
	Meteor.subscribe("allRequests");
});

Template.allRequestsModal.helpers({
	requests: function() {
		return InfoRequests.find();
	}
})