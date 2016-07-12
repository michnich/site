Template.editStudent.onCreated(function() {
    Meteor.subscribe("programType", "Community Center");
    Session.set("programLocation", "");
    var student = Students.findOne({_id: Router.current().params._id});
    Session.set("enrolledPrograms", student.program);
});

Template.editStudent.onRendered(function() {
    $("#editStudentForm").validate({
        ignore: "input[type='text']:hidden",
        rules: {
            first_name: {
                required: true
            },
            last_name: {
                required: true
            },
            dob: {
                required: true
            },
            gender: {
                required: true
            },
            race_ethnicity: {
                required: true
            },
            //add back programs
            current_grade: {
                required: true
            },
            elm_school: {
                required: function() {
                    return ($('#current_grade').val() > 0)
                }
            },
            middle_school: {
                required: function() {
                    return ($('#current_grade').val() > 6)
                }
            },
            high_school: {
                required: function() {
                    return ($('#current_grade').val() >= 10)
                }
            },
            enrolledPrograms: {
              required: function() {
                return (Session.get("enrolledPrograms").length === 0);
              }
            }
        }
    });
});

Template.editStudent.helpers({
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
    enrolledPrograms: function() {
        var programIds = Session.get("enrolledPrograms");
        return Programs.find({_id: {$in: programIds}});
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
        var program = Programs.findOne({
            _id: programId
        });
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
            program: Session.get("enrolledPrograms"),
            elm_school: $(e.target).find('[name=elm_school]').val(),
            middle_school: $(e.target).find('[name=middle_school]').val(),
            high_school: $(e.target).find('[name=high_school]').val()
        };

        if (Roles.userIsInRole(Meteor.userId(), 'admin', Roles.GLOBAL_GROUP)) {
          _.extend(student, {
            student_email: $(e.target).find('[name=student_email]').val(),
            github_username: $(e.target).find('[name=github_username]').val(),
            github_password: $(e.target).find('[name=github_password]').val(),
          });
        }

        Meteor.call("studentUpdate", student, studentId, function(error, result) {
            if (error) {
                //error handling
                console.log(error);
            }
            if (result) {
                Router.go('studentProfile', {
                    _id: studentId
                });
            }
        });
    },

    //retrieves the currently selected program and stores it in enrolledPrograms array
    //so students may be enrolled in more than one program at a time
    'click #anotherProgram': function(e) {
        var enrolledPrograms = Session.get("enrolledPrograms");
        var programId = $('select[name=program_time]').val();
        enrolledPrograms.push(programId);
        Session.set("enrolledPrograms", enrolledPrograms);
    }
});
