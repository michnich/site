Template.editParentProfile.onRendered(function() {
    $("#editProfile").validate({
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

Template.editParentProfile.helpers({
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
    stateSelected: function(state) {
      if (this.state === state) {
        return true;
      }
      else {
        return false;
      }
    }
});

Template.editParentProfile.events({
    'change #otherRace': function(e) {
        $('label[name=otherRaceLabel]').toggleClass('hidden');
        $('input[name=otherRaceText]').toggleClass('hidden');
    },

    'submit form': function(e) {
        e.preventDefault();
        //gather all the info from the fields
        var parentId = Parents.findOne({})._id;

        var parentProfile = {
            first_name: $(e.target).find('[name=first_name]').val(),
            last_name: $(e.target).find('[name=last_name]').val(),
            dob: $(e.target).find('[name=dob]').val(),
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
            //EMPLOYMENT INFO
        };

        Meteor.call("parentUpdate", parentProfile, parentId, function(error, result) {
            if (error) {
                alert("Sorry! There was an error updating your info. Please try again and let us know if the problem continues!");
                console.log(error.reason);
            }
            if (result) {
               $('#success').show();
               $(window).scrollTop(0);
            }
        });
    }
});
