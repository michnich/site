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
    }
});

Template.editParentProfile.events({
    'submit form': function(e) {
        e.preventDefault();
        //gather all the info from the fields
        var parentId = this._id;

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
            //EMPLOYMENT INFO
        };

        Meteor.call("parentUpdate", parent, parentId, function(error, result){
          if(error){
            //error handling
            console.log("error", error);
          }
          if(result){
          //do something
          }
        });
    }
});
