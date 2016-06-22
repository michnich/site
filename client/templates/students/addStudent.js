//IGNORE
Template.addStudent.onRendered(function() {
    $("#studentForm").validate({
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
            pictures_allowed: {
                required: true
            },
            program_time: {
                required: true
            },
            //do we take pre k age kids???
            elm_school: {
                depends: function(element) {
                    return $("#current_grade").val() >= 0;
                }
            },
            middle_school: {
                depends: function(element) {
                    return $("#current_grade").val() > 6;
                }
            },
            high_school: {
                depends: function(element) {
                    return $("#current_grade").val() > 9;
                }
            }
        }
    });
});
Template.addStudent.onCreated(function() {
    Meteor.subscribe("programType", "Community Center");
    Session.set("programLocation", "");
    Session.set("programType", "");
});

Template.addStudent.helpers({
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
    },

    programType: function(type) {
      return Session.get("programType") === type;
    },

    summerCampSessions: function() {
      return Programs.find({type: "Summer Camp"});
    }
});

Template.addStudent.events({
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

    'change #programType': function(e) {
      var programType = ($e).target.find(["name=program_type"]).val();
      Session.set("programType", programType);
    }
})
