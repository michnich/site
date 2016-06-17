Template.allRequests.onCreated(function() {
    Meteor.subscribe("allRequests");
    Session.set("statusType", "")
});

Template.allRequests.helpers({
    requests: function() {
        var statusType = Session.get("statusType");
        if (statusType === "") {
            return InfoRequests.find({});
        } else {
            return InfoRequests.find({
                status: statusType
            });
        }
    }
});

Template.allRequests.events({
    'change #selectStatus': function(e) {
				e.preventDefault();
        var statusType = $(e.target).val();
        Session.set("statusType", statusType);
    }
})
