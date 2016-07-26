Students = new Mongo.Collection('students');

if (Meteor.isServer) {
    Meteor.publish("allStudents", function() {
        return Students.find();
    });
    Meteor.publish("student", function(studentId) {
        return Students.find({
            _id: studentId
        });
    });
    Meteor.publish("studentsByParent", function(parent) {
      if (!_.isEmpty(parent)) {
        return Students.find({parentId: parent});
      }
      else {
        return;
      }
    })
};

Meteor.methods({
    //inserts the student into the database and returns the student id
    studentInsert: function(student) {
        var now = moment().toDate();
        _.extend(student, {signup_date: now});
        var id = Students.insert(student);
        return id;
    },

    addSummerStudent: function(student, parentFirst, parentLast, parentDob) {
        var parent = Parents.findOne({first_name: parentFirst, last_name: parentLast, dob: parentDob});
        var now = moment().toDate();
        _.extend(student, {
            signup_date: now,
            parentId: parent._id
        });
        var id = Students.insert(student);
        return id;
    },

    studentUpdate: function(student, studentId) {
        return Students.update({
            _id: studentId
        }, {
            $set: student
        });
    },

    //returns true if the student is already in the database, false if they are not
    //check based on name and date of birth
    existingStudent: function(firstName, lastName, dateOfBirth) {
        var student = Students.findOne({
            $and: [{
                first_name: firstName
            }, {
                last_name: lastName
            }, {
                dob: dateOfBirth
            }]
        });
        if (_.isEmpty(student)) {
            return false;
        } else {
            return true;
        }
    },

    setStartDate: function(studentId, date) {
        var newDate = new Date(moment(date).toDate());
        Students.update({
            _id: studentId
        }, {
            $set: {
                start_date: newDate
            }
        });
    },

    updateStudentProgress: function(studentId, htmlArray, cssArray, jsArray, devToolsArray) {
        return Students.update(this._id, {
            $set: {
                html: htmlArray,
                css: cssArray,
                js: jsArray,
                devTools: devToolsArray
            }
        });
    }
});
