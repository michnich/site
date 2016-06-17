InfoRequests =new Mongo.Collection('inforequests');

if (Meteor.isServer) {
  Meteor.publish("parentRequests", function(){
    return InfoRequests.find({type: parent});
  }),
  Meteor.publish("volunteerRequests", function() {
  	return InfoRequests.find({type: volunteer});
  }),
  Meteor.publish("supporterRequests", function(){
    return InfoRequests.find({type: parent});
  }),
  Meteor.publish("educatorRequests", function(){
    return InfoRequests.find({type: educator});
  }),
  Meteor.publish("partnerRequests", function(){
    return InfoRequests.find({type: partner});
  }),
  Meteor.publish("otherRequests", function(){
    return InfoRequests.find({type: other});
  })
  Meteor.publish("allRequests", function(){
    return InfoRequests.find();
  })
};

Meteor.methods({
  requestInsert: function(request) {
    var id = InfoRequests.insert(request);
    return id;
  },
  updateRequestStatus: function(request, newStatus) {
    InfoRequests.update({_id:request}, {$set:{status: newStatus}});  
  }
});
