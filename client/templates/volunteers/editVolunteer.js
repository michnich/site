//unused
Template.editVolunteer.onCreated(function() {
  Session.set('volunteerErrors', {});
});

Template.editVolunteer.helpers({
  errorMessage: function(field) {
    return Session.get('volunteerErrors')[field];
  },
  errorClass: function(field) {
    return !!Session.get('volunteerErrors')[field] ? 'has-error' : '';
  },

  isInGroup: function(program) {
  	if (_.indexOf(this.program, program) != -1) {
  		return true;
  	}
  	else {
  		return false;
  	}
  }
});

Template.editVolunteer.events({
	'submit form': function(e) {
		e.preventDefault();
		//gather all the info from the fields
		var volunteerId = this._id;

		var volunteer = {
			first_name: $(e.target).find('[name=first_name]').val(),
			last_name: $(e.target).find('[name=last_name]').val(),
			dob: $(e.target).find('[name=dob]').val(),
			type: $(e.target).find('[name=type]').val(),
			program: $(e.target).find("[name=program]:checked").map(function() {return this.value;}).get(),
			email: $(e.target).find('[name=email]').val(),
			phone: $(e.target).find('[name=phone]').val(),
			address1: $(e.target).find('[name=address1]').val(),
			address2: $(e.target).find('[name=address2]').val(),
			city: $(e.target).find('[name=city]').val(),
			state: $(e.target).find('[name=state]').val(),
			zip: $(e.target).find('[name=zip]').val(),
			country: $(e.target).find('[name=country]').val(),
			dob: $(e.target).find('[name=dob]').val(),
			eme_contact: $(e.target).find('[name=eme_contact]').val(),
			eme_number: $(e.target).find('[name=eme_number]').val(),
			employer: $(e.target).find('[name=employer]').val(),
			position: $(e.target).find('[name=position]').val(),
			park_check: $(e.target).find('[name=park_check]').val(),
			park_check_date: $(e.target).find('[name=park_check_date]').val(),
			pa_criminal_check: $(e.target).find('[name=pa_criminal_check]').val(),
			pa_criminal_check_date: $(e.target).find('[name=pa_criminal_check_date]').val(),
			pa_child_check: $(e.target).find('[name=pa_child_check]').val(),
			pa_child_check_date: $(e.target).find('[name=pa_child_check_date]').val(),
			fbi_check: $(e.target).find('[name=fbi_check]').val(),
			fbi_check_date: $(e.target).find('[name=fbi_check_date]').val(),
		};

		//check to make sure all required fields were filled
		var errors = checkVolunteer(volunteer);
		//if not throw errors for the empty fields
		if (!_.isEmpty(errors)) {
			return Session.set('volunteerErrors', errors);
		}

		//otherwise insert the volunteer into the collection
		Volunteers.update(volunteerId, {$set: volunteer}, function(error) {
      		if (error) {
      			console.log(error.reason);
        		throwError(error.reason);
      		} else {
      			console.log("no error");
        		Router.go('volunteerProfile', {_id: volunteerId});
      		}
    	});
	}
});
