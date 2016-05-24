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
  //inserts the student into the database and returns the student id
  studentInsert: function(student) {
    _.extend(student, {start_date: moment().startOf('day')});
    var id = Students.insert(student);
    return id;
  },

  //returns true if the student is already in the database, false if they are not
  //check based on name and date of birth
  existingStudent: function(firstName, lastName, dateOfBirth) {
    var student = Students.findOne({ $and: [{first_name: firstName}, {last_name: lastName}, {dob: dateOfBirth}]});
    if (_.isEmpty(student)) {
      return false;
    }
    else {
      return true;
    }
  },
});
