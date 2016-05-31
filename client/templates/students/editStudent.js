Template.editStudent.onCreated(function() {
  Meteor.subscribe("programType", "Community Center");
  Session.set("programLocation", "");
});

Template.editStudent.onRendered(function() {
    $("#editStudentForm").validate({
        rules: {
            pictures_allowed: {
                required: true
            },
            program: {
                required: true
            },
            //elm school
            //middle school
            //high school
        }
    });
});

Template.editStudent.helpers({
    picsAllowed: function() {
        return (this.pictures_allowed === "yes");
    },
    picsNotAllowed: function() {
        return (this.pictures_allowed === "no");
    },
    raceChecked: function(race) {
        var array = _.toArray(this.race_ethnicity);
        if (_.indexOf(array, race) != -1) {
            return true;
        } else {
            return false;
        }
    },
    genderChecked: function(gender) {
        var array = _.toArray(this.gender);
        if (_.indexOf(array, gender) != -1) {
            return true;
        } else {
            return false;
        }
    },
    programLocations: function() {
        var programs = _.uniq(_.toArray(Programs.find().fetch()), false, function(p) {
            return p.name;
        });
        Session.set("programLocation", programs[0].name);
        return programs;
    },

    programTimes: function() {
        var location = Session.get("programLocation");
        return Programs.find({
            name: location
        });
    },
    timeFormat: function(timeString) {
        return moment().hour(timeString).minute(0).format("hh:mm a");
    },
    programLocationSelected: function(name) {
       var programId = Template.parentData(1).program;
       var program = Programs.findOne({_id: programId});
       return (name === program.name);
    },
    programTimeSelected: function(id) {
       return (id === Template.parentData(1).program);
    }
});

Template.editStudent.events({
    'submit form': function(e) {
        e.preventDefault();
        //gather all the info from the fields
        var studentId = this._id;

        var student = {
            first_name: $(e.target).find('[name=first_name]').val(),
            last_name: $(e.target).find('[name=last_name]').val(),
            dob: $(e.target).find('[name=dob]').val(),
            gender: $(e.target).find("[name=gender]:checked").map(function() {
                if (this.value === "Other") {
                    return $(e.target).find("[name=otherText]").val();
                } else {
                    return this.value;
                }
            }).get(),
            race_ethnicity: $(e.target).find("[name=race_ethnicity]:checked").map(function() {
                return this.value;
            }).get(),
            pictures_allowed: $(e.target).find('[name=pictures_allowed]:checked').val(),
            program: $(e.target).find('[name=program_time]').val(),
            elm_school: $(e.target).find('[name=elm_school]').val(),
            middle_school: $(e.target).find('[name=middle_school]').val(),
            high_school: $(e.target).find('[name=high_school]').val(),
        };

        Meteor.call("studentUpdate", student, studentId, function(error, result){
          if(error){
            //error handling
            console.log("error", error);
          }
          if(result){
            console.log("sucess");
            Router.go('studentProfile', {
                _id: studentId
            });
          }
        });


    }
});
