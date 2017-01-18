Template.addStudent.onRendered(function() {
  //fields required to submit form
  //less than usual because younger students may not know
   $("#addStudent").validate({
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
            //do we take pre k age kids???
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
            }
        }
    });
});

Template.addStudent.onCreated(function() {
    Meteor.subscribe("allPrograms");
    Meteor.subscribe("parentByUserId", Meteor.userId());
    Session.set("programSelected", "");
    Session.set("programLocation", "");
    Session.set("enrolledPrograms", []);
});

Template.addStudent.helpers({
    //if a program has been selected, will return true and will display the html for the location and time selects
    //used to keep them hidden until a choice is made
    programSelected: function() {
        return (Session.get("programSelected"));
    },

    //displays the locations based off the selected program
    //sets the session variable for the program location to be used with the program time helper
    programLocations: function() {
        var selectedProgram = Session.get("programSelected");
        var programs = _.uniq(_.toArray(Programs.find({
            program_type: selectedProgram
        }).fetch()), false, function(p) {
            return p.name;
        });
        Session.set("programLocation", programs[0].name);
        return programs;
    },

    //retrieves the selected program location via a session varible (so it updates on change) and the selected program
    //returns programs with that location and type
    programTimes: function() {
        var location = Session.get("programLocation");
        var type = Session.get("programSelected");
        return Programs.find({
            name: location,
            program_type: type
        });
    },

    //formats the start and end times retrieved from the database, to show in the program time selector
    timeFormat: function(timeString) {
        return moment().hour(timeString).minute(0).format("hh:mm a");
    },

    //returns true if the selected program is a summer camp
    //used to display the session dates in the select for program time and before/after care field
    //NOT CURRENTLY USED
    summerCamp: function() {
        return (Session.get("programSelected") === "Summer Camp");
    },

    //returns the programs the user has currently enrolled in
    //used so they can enroll a student in more than one program at a time
    enrolledPrograms: function() {
        var enrolledPrograms = Session.get("enrolledPrograms");
        return Programs.find({
            '_id': {
                $in: enrolledPrograms
            }
        });
    },

    //returns true if the user has selected programs, shows selected programs area
    enrolledProgramsTrue: function() {
        var enrolledPrograms = Session.get("enrolledPrograms");
        return (enrolledPrograms.length != 0);
    },
})

Template.addStudent.events({
    'submit form': function(e) {
        e.preventDefault();
        var student = {
            first_name: $(e.target).find('[name=first_name]').val(),
            last_name: $(e.target).find('[name=last_name]').val(),
            dob: $(e.target).find('[name=dob]').val(),
            gender: $(e.target).find("[name=gender]:checked").map(function() {
                if (this.value === "Other") {
                    return $(e.target).find("[name=otherGenderText]").val();
                } else {
                    return this.value;
                }
            }).get(),
            race_ethnicity: $(e.target).find("[name=race_ethnicity]:checked").map(function() {
                if (this.value === "Other") {
                    return $(e.target).find("[name=otherRaceText]").val();
                } else {
                    return this.value;
                }
            }).get(),
            program: Session.get("enrolledPrograms"),
            current_grade: $(e.target).find('[name=current_grade]').val(),
            elm_school: $(e.target).find('[name=elm_school]').val(),
            middle_school: $(e.target).find('[name=middle_school]').val(),
            high_school: $(e.target).find('[name=high_school]').val(),
            photos: $(e.target).find('[name=takePhotos]:checked').val(),
            parentId: "admin",
            parent_first_name: $(e.target).find('[name=parent_first_name]').val(),
            parent_last_name: $(e.target).find('[name=parent_last_name]').val(),
            email: $(e.target).find('[name=parent_email]').val(),
            phone: $(e.target).find('[name=parent_phone]').val(),
            parent_dob: $(e.target).find('[name=parent_dob]').val(),
            parent_race_ethnicity: $(e.target).find('[name=parent_race_ethnicity]').val(),
            address1: $(e.target).find('[name=address1]').val(),
            address2: $(e.target).find('[name=address2]').val(),
            city: $(e.target).find('[name=city]').val(),
            state: $(e.target).find('[name=state]').val(),
            zip: $(e.target).find('[name=zip]').val(),
            eme_contact: $(e.target).find('[name=eme_contact]').val(),
            eme_number: $(e.target).find('[name=eme_number]').val(),
        };

        Meteor.call("studentInsert", student, function(error, result) {
            if (error) {
                alert("Sorry, there was an error! Please try submitting the form again and let us know if the problem persists.")
            }
            if (result) {
              $('#success').show();
              $(window).scrollTop(0);
            }
        });
    },

    'click #no': function() {
        $('#anotherStudent').on('hidden.bs.modal', function() {
            Router.go('dashboard');
        });
        $('#anotherStudent').modal('hide');
    },

    'click #yes': function() {
        $('#anotherStudent').modal('hide');
        document.location.reload(true);
    },

    'change #program_location': function(e) {
        var programLocation = ($e).target.find(["name=program_location"]).val();
        Session.set("programLocation", programLocation);
    },

    'change #otherGender': function(e) {
        $('label[name=otherGenderLabel]').toggleClass('hidden');
        $('input[name=otherGenderText]').toggleClass('hidden');
    },

    'change #otherRace': function(e) {
        $('label[name=otherRaceLabel]').toggleClass('hidden');
        $('input[name=otherRaceText]').toggleClass('hidden');
    },

    'click #selectProgram': function(e) {
        var selectedProgram = $('select[name=program_type]').val();
        Session.set("programSelected", selectedProgram);
    },

    'change #program_type': function(e) {
        var selectedProgram = $(e.target).val();
        Session.set("programSelected", selectedProgram);
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
