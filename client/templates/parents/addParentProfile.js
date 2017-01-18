Template.addParentProfile.onRendered(function() {
    //the required fields for the form, employment info is optional
    $("#parentProfile").validate({
        rules: {
            parent_first_name: {
                required: true
            },
            parent_last_name: {
                required: true
            },
            parent_dob: {
                required: true
            },
            parent_race_ethnicity: {
                required: true
            },
            email: {
                required: true
            },
            phone: {
                required: true
            },
            address1: {
                required: true
            },
            city: {
                required: true
            },
            state: {
                required: true
            },
            zip: {
                required: true
            },
            eme_contact: {
                required: true
            },
            eme_number: {
                required: true
            }
        }
    });
});

Template.addParentProfile.events({
  //toggles an input field for elaboration if other is checked for race
    'change #otherParentRace': function(e) {
        $('label[name=otherParentRaceLabel]').toggleClass('hidden');
        $('input[name=otherParentRaceText]').toggleClass('hidden');
    },

    "submit form": function(e) {
        e.preventDefault();
        //object that is passed to server, signup date is added server side
        var parentProfile = {
            first_name: $(e.target).find('[name=parent_first_name]').val(),
            last_name: $(e.target).find('[name=parent_last_name]').val(),
            dob: $(e.target).find('[name=parent_dob]').val(),
            race_ethnicity: $(e.target).find("[name=parent_race_ethnicity]:checked").map(function() {
                return this.value;
            }).get(),
            email: $(e.target).find('[name=email]').val(),
            phone: $(e.target).find('[name=phone]').val(),
            address1: $(e.target).find('[name=address1]').val(),
            address2: $(e.target).find('[name=address2]').val(),
            city: $(e.target).find('[name=city]').val(),
            state: $(e.target).find('[name=state]').val(),
            zip: $(e.target).find('[name=zip]').val(),
            eme_contact: $(e.target).find('[name=eme_contact]').val(),
            eme_number: $(e.target).find('[name=eme_number]').val(),
            occupation: $(e.target).find('[name=occupation]').val(),
            employer_name: $(e.target).find('[name=employer_name]').val(),
            income: $(e.target).find('[name=income]').val()
        };
        Meteor.call("parentInsert", parentProfile, function(error, result) {
            if (error) {
                alert("Sorry! There was an error! Please try resubmitting the form again. If that doesn't work please contact us and let us know.")
            }
            if (result) {
                Router.go('/enrollStudent'); //next step in process is to enroll students
            }
        });
    }
});
