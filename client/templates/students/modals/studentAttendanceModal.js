Template.studentAttendanceModal.onCreated(function () {
    Meteor.subscribe("allStudents");
});

Template.studentAttendanceModal.helpers({
    student:function() {
        return Students.find();
    },
    getToday: function() {
        return moment().format("YYYY-MM-DD");
    }
});

Template.studentAttendanceModal.events({
  'submit form': function(e) {
    e.preventDefault();
    var students = $(e.target).find("[name=students]:checked").map(function() {return this.value;}).get();
    var date = $(e.target).find('[name=attendanceDate]').val();
    Meteor.call("takeAttendance", date, students, function(error, result){
      if(error){
        console.log("error", error);
      }
    });
    $("#studentAttendanceForm").trigger('reset');
    $("#studentAttendanceForm #closeButton").trigger('click');
    //in function add check and handeling for array

  }
})
