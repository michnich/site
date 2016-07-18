Template.studentAttendanceModal.onCreated(function() {
    Meteor.subscribe("allPrograms");
    Meteor.subscribe("allStudents");
    Meteor.subscribe("allStudentAttendance");
});

Template.studentAttendanceModal.helpers({
    programs: function() {
        return Programs.find();
    },
    student: function() {
        var id = Session.get("programId");
        return Students.find({program: id});
    },
    getToday: function() {
        return moment().format("YYYY-MM-DD");
    }
});

Template.studentAttendanceModal.events({
    'submit form': function(e) {
        e.preventDefault();
        var students = $(e.target).find("[name=students]:checked").map(function() {
            return this.value;
        }).get();
        var date = $(e.target).find('[name=attendanceDate]').val();
        Meteor.call("takeAttendance", date, students, function(error, result) {
            if (error) {
                console.log(error);
            }
        });
        $("#studentAttendanceForm").trigger('reset');
        $("#studentAttendanceForm #closeButton").trigger('click');
    },

    'change #program': function(e) {
        program = $('select[name=program]').val();
        Session.set("programId", program);
    }
})
