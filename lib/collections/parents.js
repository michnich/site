Parents = new Mongo.Collection('parents');

if (Meteor.isServer){
  Meteor.publish("allParents", function(){
    return Parents.find();
  });
  Meteor.publish("parentById", function(id){
    return Parents.find({_id: id});
  });
  Meteor.publish("parentByUserId", function(id) {
    return Parents.find({userId: id});
  })
}


Meteor.methods({
  //inserts the parent into the database and returns the parent id
  parentInsert: function(parent) {
    //store the sign up date of the parent, as well as their current logged in user id
    var now = moment().toDate();
    _.extend(parent, {signup_date: now, userId: Meteor.userId()});
    var id = Parents.insert(parent);
    return id;
  },

  parentInsertNoAccount: function(parent) {
    var now = moment().toDate();
    _.extend(parent, {signup_date: now});
    return Parents.insert(parent);
  },

  parentUpdate: function(parent, parentId) {
    return Parents.update({_id:parentId}, {$set:parent});
  },

});
