Template.studentProfile.helpers({
    getToday: function() {
        return moment().format("YYYY-MM-DD");
    },
    studentAttendance: function() {
      Meteor.subscribe("singleStudentAttendance", this._id);
      var mostRecent = _.toArray(StudentAttendance.find().fetch());
      var dateStrings = [];
      var i;
      var x = (mostRecent.length < 4) ? mostRecent.length : 4;
      for (i = 0; i < x; i++) {
        dateStrings.push(moment(mostRecent[i].date).format("MM-DD-YYYY"));
      }
      return dateStrings;
    }
});

Template.studentProfile.events({
    "submit form": function(e) {
        e.preventDefault();
        var date = $(e.target).find('[name=attendanceDate]').val();
        if (!this.startDate) {
          Meteor.call("setStartDate", this._id, date, function(error, result){
            if(error){
              console.log("error", error);
            }
          });
        }
        Meteor.call("takeAttendance", date, this._id, function(error, result){
          if(error){
            console.log("error", error);
          }
        });
    }
});
