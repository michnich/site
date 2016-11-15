Template.studentProfile.helpers({
    getToday: function() {
        return moment().format("YYYY-MM-DD");
    },
    studentAttendance: function() {
        if (!_.isEmpty(this._id)) {
          Meteor.subscribe("singleStudentAttendance", this._id);
        }
        var mostRecent = _.toArray(StudentAttendance.find().fetch());
        var dateStrings = [];
        var i;
        var x = (mostRecent.length < 4) ? mostRecent.length : 4;
        for (i = 0; i < x; i++) {
            dateStrings.push(moment(mostRecent[i].date).format("MM-DD-YYYY"));
        }
        return dateStrings;
    },
    parent: function(field) {
        Meteor.subscribe("parentById", this.parentId);
        return Parents.find();
    },
    adminAdd: function() {
      if ((_.isEmpty(this.parentId)) || (this.parentId == "admin")) {
        return true;
      }
    },
    program: function() {
        Meteor.subscribe("programById", {$in: this.program});
        return Programs.find({_id: {$in: this.program}});
    },
    getCurrentLevel: function(category) {
      var levels = _.pick(this, category);
      var i;
      for (i = 0; i < levels.length; i++) {
        if (levels[i].current) {
          return levels[i].level;
        }
      }
    },
    formatDate: function(date) {
      return moment(date).format("MMM Do, YYYY");
    }
});

Template.studentProfile.events({
    "submit form": function(e) {
        e.preventDefault();
        var date = $(e.target).find('[name=attendanceDate]').val();
        if (!this.startDate) {
            Meteor.call("setStartDate", this._id, date, function(error, result) {
                if (error) {
                    console.log("error", error);
                }
            });
        }
        Meteor.call("takeAttendance", date, this._id, function(error, result) {
            if (error) {
                console.log("error", error);
            }
        });
    }
});
