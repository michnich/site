Template.addStudent.onCreated(function() {
  Session.set('studentErrors', {});
});

Template.addStudent.helpers({
  errorMessage: function(field) {
    return Session.get('studentErrors')[field];
  },
  errorClass: function(field) {
    return !!Session.get('studentErrors')[field] ? 'has-error' : '';
  }
});

Template.addStudent.events({
	'submit form': function(e) {
		e.preventDefault();
		//gather all the info from the fields
		var student = {
			first_name: $(e.target).find('[name=first_name]').val(),
			last_name: $(e.target).find('[name=last_name]').val(),
			dob: $(e.target).find('[name=dob]').val(),
			program: $(e.target).find("[name=program]").val(),
			parent_email: $(e.target).find('[name=parent_email]').val(),
			phone: $(e.target).find('[name=phone]').val(),
			pictures_allowed: $(e.target).find('[name=pictures_allowed]').val(),
			address1: $(e.target).find('[name=address1]').val(),
			address2: $(e.target).find('[name=address2]').val(),
			city: $(e.target).find('[name=city]').val(),
			state: $(e.target).find('[name=state]').val(),
			zip: $(e.target).find('[name=zip]').val(),
			elm_school: $(e.target).find('[name=elm_school]').val(),
			middle_school: $(e.target).find('[name=middle_school]').val(),
			high_school: $(e.target).find('[name=high_school]').val(),
			eme_contact: $(e.target).find('[name=eme_contact]').val(),
			eme_number: $(e.target).find('[name=eme_number]').val(),
		};

		//check to make sure all required fields were filled
		var errors = checkStudent(student);

		//if not throw errors for the empty fields
		if (!_.isEmpty(errors)) {
			return Session.set('studentErrors', errors);
		}

		//otherwise insert the student into the collection
		Meteor.call('studentInsert', student, function(error,result) {
			if (error) {
				return throwError(error.reason);
			}
			else {
				//Router.go('studentProfile', {_id: result});
			}
		});
	}
});