Template.addParentProfile.onRendered(function() {
    $("#parentProfileForm").validate({
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

Template.addParentProfile.helpers({
    'change #other': function(e) {
        $('label[name=otherLabel]').toggleClass('hidden');
        $('input[name=otherText]').toggleClass('hidden');
    }
});

Template.addParentProfile.events({
    'change #otherRace': function(e) {
        $('label[name=otherRaceLabel]').toggleClass('hidden');
        $('input[name=otherRaceText]').toggleClass('hidden');
    },

    "submit form": function(e) {
        e.preventDefault();
        var parentProfile = {
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
            email: $(e.target).find('[name=email]').val(),
            phone: $(e.target).find('[name=phone]').val(),
            address1: $(e.target).find('[name=address1]').val(),
            address2: $(e.target).find('[name=address2]').val(),
            city: $(e.target).find('[name=city]').val(),
            state: $(e.target).find('[name=state]').val(),
            zip: $(e.target).find('[name=zip]').val(),
            eme_contact: $(e.target).find('[name=eme_contact]').val(),
            eme_number: $(e.target).find('[name=eme_number]').val(),
            userId: Meteor.userId()
        };
        Meteor.call("parentInsert", parentProfile, function(error, result) {
            if (error) {
                alert("Sorry! There was an error! Please try resubmitting the form again. If that doesn't work please contact us and let us know.")
            }
            if (result) {
                Router.go('/enrollStudent');
            }
        });
    }
});
