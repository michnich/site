Template.infoRequestItem.events({
  "click #inProgress": function(e){
     e.preventDefault();
     Meteor.call("updateRequestStatus", this._id, "In Progress");
  },
  "click #complete": function(e){
    e.preventDefault();
    Meteor.call("updateRequestStatus", this._id, "Complete");
  }
});
