Parents = new Mongo.Collection('parents');

if (Meteor.isServer){
  Meteor.publish("allParents", function(){
    return Parents.find();
  });
  Meteor.publish("parentById", function(id){
    return Parents.find({_id: id});
  });
}


Meteor.methods({
  //inserts the parent into the database and returns the parent id
  parentInsert: function(parent) {
    //store the sign up date of the parent, as well as their current logged in user id
    _.extend(parent, {signup_date: moment().startOf('day'), userId: Meteor.userId()});
    var id = Parents.insert(parent);
    return id;
  },

  parentUpdate: function(parent, parentId) {
    return Parents.update({_id:parentId}, {$set:parent});
  },
  
});
