Students = new Mongo.Collection('students');

if (Meteor.isServer) {
  Meteor.publish("allStudents", function(){
    return Students.find();
  }),
  Meteor.publish("student", function(studentId) {
  	return Students.find({_id: studentId});
  })
};

Students.allow({
  update: function(userId, student) {
    return !! userId
  },
  remove: function(userId, student) {
    return !! userId
  }
});

Meteor.methods({
  studentInsert: function(student) {
    var id = Students.insert(student);
    return id;
  }
});
