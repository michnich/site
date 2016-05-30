Template.parentAddStudent.onCreated(function() {
    Session.set("programLocation", "");
});

Template.parentAddStudent.onRendered(function() {
    $("#studentForm").validate({
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

Template.parentAddStudent.helpers({
    programLocations: function() {
        Meteor.subscribe("programType", "Community Center");
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
    }
});

Template.parentAddStudent.events({
    'change #program_location': function(e) {
        var programLocation = ($e).target.find(["name=program_location"]).val();
        Session.set("programLocation", programLocation);
    },

    'change #otherGender': function(e) {
        $('label[name=otherLabel]').toggleClass('hidden');
        $('input[name=otherText]').toggleClass('hidden');
    },

    'submit form': function(e) {
        e.preventDefault();
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

        Meteor.call("studentInsert", student, function(error, result) {
            if (error) {
                console.log("error", error);
            }
            if (result) {
                $('#anotherStudent').modal('show');
            }
        });
    },

    'click #no': function() {
      $('#anotherStudent').modal('hide');
      Router.go("/dashboard");
    },
    'click #yes': function() {
      $('#anotherStudent').modal('hide');
      document.location.reload(true);
    }
});
