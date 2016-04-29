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

checkStudent = function(student) {
  var errors = {};
  if (!student.first_name) {
    errors.first_name = "Please enter a first name";
  }
  if (!student.last_name) {
    errors.last_name = "Please enter a last name";
  }
  if (!student.dob) {
    errors.dob = "Please enter a date of birth";
  }
  if (!student.program) {
    errors.program = "Please choose at least one program";
  }
  if (!student.parent_email) {
    errors.parent_email = "Please enter an email address";
  }
  if (!student.phone) {
    errors.phone = "Please enter a phone number";
  }
  if (!student.address1) {
    errors.address1 = "Please enter a street address";
  }
  if (!student.city) {
    errors.city = "Please enter a city";
  }
  if (!student.state) {
    errors.state = "Please enter a state";
  }
  if (!student.zip) {
    errors.zip = "Please enter a zip code";
  }
  if (!student.eme_contact) {
    errors.eme_contact = "Please enter a emergency contact";
  }
  if (!student.eme_number) {
    errors.eme_number = "Please enter a number where we can reach your emergency contact";
  }
  if (!student.pictures_allowed) {
    errors.pictures_allowed = "Please select an option";
  }  
  return errors;
};

Meteor.methods({
  studentInsert: function(student) {
    var id = Students.insert(student);
    return id;
  }
});