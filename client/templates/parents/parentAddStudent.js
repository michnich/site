Template.parentAddStudent.onRendered(function() {
    $("#studentForm").validate({
        rules: {
            pictures_allowed: {
                required: true
            },
            program: {
                required: true
            }
        }
    });
});

Template.parentAddStudent.events({
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
