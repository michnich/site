StudentAttendance = new Mongo.Collection('studentAttendance');

if (Meteor.isServer) {
    Meteor.publish("allStudentAttendance", function() {
            return StudentAttendance.find();
        }),
        Meteor.publish("singleStudentAttendance", function(id) {
            return StudentAttendance.find({
                studentId: id
            });
        })
};

Meteor.methods({
    takeAttendance: function(date, id) {
        var newDate = new Date(moment(date).toDate());
        if (id.constructor === Array) {
          StudentAttendance.update({date: newDate}, {$addToSet: {studentId: {$each: id}}}, {upsert: true});
        }
        else if (id.constructor === String) {
          StudentAttendance.update({date: newDate}, {$addToSet: {studentId: id}}, {upsert: true});
        }
        else {
          throw Meteor("data-type", "ID data type must be a single string or array");
        }

    }
})
