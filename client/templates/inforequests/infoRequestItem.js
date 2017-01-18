Template.infoRequestItem.events({
  //updates the info request's status to 'in progress'
  "click #inProgress": function(e){
     e.preventDefault();
     Meteor.call("updateRequestStatus", this._id, "In Progress");
  },
  //updates the info requests status to 'complete'
  "click #complete": function(e){
    e.preventDefault();
    Meteor.call("updateRequestStatus", this._id, "Complete");
  }
});
