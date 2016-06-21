Schools = new Mongo.Collection('schools');

if (Meteor.isServer){
  Meteor.publish("allSchools", function(){
    return Schools.find();
  });
}
