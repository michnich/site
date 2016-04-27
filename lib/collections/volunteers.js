Volunteers = new Mongo.Collection('volunteers');

if (Meteor.isServer) {
  Meteor.publish("allVolunteers", function(){
    return Volunteers.find();
  }),
  Meteor.publish("volunteer", function(volunteerId) {
  	return Volunteers.find({_id: volunteerId});
  }),
  Meteor.publish("untiedVolunteers", function() {
  	return Volunteers.find({userId: {$exists: false}});
  })
};

Volunteers.allow({
  update: function(userId, volunteer) {
    return !! userId
  },
  remove: function(userId, volunteer) {
    return !! userId
  }
});

//checks each property of the volunteer object to ensure none are null
//if null sets an error for the property
//returns all errors
checkVolunteer = function(volunteer) {
	var errors = {};
	if (!volunteer.first_name) {
		errors.first_name = "Please enter a first name";
	}
	if (!volunteer.last_name) {
		errors.last_name = "Please enter a last name";
	}
	if (!volunteer.dob) {
		errors.dob = "Please enter a date of birth";
	}
	if (!volunteer.type) {
		errors.type = "Please enter a volunteer role";
	}
	if (_.isEmpty(volunteer.program)) {
		errors.program = "Please choose at least one program";
	}
	if (!volunteer.email) {
		errors.email = "Please enter an email address";
	}
	if (!volunteer.phone) {
		errors.phone = "Please enter a phone number";
	}
	if (!volunteer.address1) {
		errors.address1 = "Please enter a street address";
	}
	if (!volunteer.city) {
		errors.city = "Please enter a city";
	}
	if (!volunteer.state) {
		errors.state = "Please enter a state";
	}
	if (!volunteer.zip) {
		errors.zip = "Please enter a zip code";
	}
	if (!volunteer.eme_contact) {
		errors.eme_contact = "Please enter a emergency contact";
	}
	if (!volunteer.eme_number) {
		errors.eme_number = "Please enter a number where we can reach your emergency contact";
	}
	if (!volunteer.employer) {
		errors.employer = "Please enter the name of your employer";
	}
	if (!volunteer.position) {
		errors.position = "Please enter your position title";
	}

	if (!volunteer.park_check) {
		errors.park_check = "Have you completed your Parks & Rec background check?";
	}
	else if (volunteer.park_check == 'Yes') {
		if (!volunteer.park_check_date) {
			errors.park_check_date = "Please enter the date completed";
		}
	}

	if (!volunteer.pa_criminal_check) {
		errors.pa_criminal_check = "Have you completed your Parks & Rec background check?";
	}
	else if (volunteer.pa_criminal_check == 'Yes') {
		if (!volunteer.pa_criminal_check_date) {
			errors.pa_criminal_check_date = "Please enter the date completed";
		}
	}

	if (!volunteer.pa_child_check) {
		errors.pa_child_check = "Have you completed your Parks & Rec background check?";
	}
	else if (volunteer.pa_child_check == 'Yes') {
		if (!volunteer.pa_child_check_date) {
			errors.pa_child_check_date = "Please enter the date completed";
		}
	}

	if (!volunteer.fbi_check) {
		errors.fbi_check = "Have you completed your Parks & Rec background check?";
	}
	else if (volunteer.fbi_check == 'Yes') {
		if (!volunteer.fbi_check_date) {
			errors.fbi_check_date = "Please enter the date completed";
		}
	}
	
	return errors;
}

Meteor.methods({
	volunteerInsert: function(volunteer) {
		var id = Volunteers.insert(volunteer);
		return id;
	}
});