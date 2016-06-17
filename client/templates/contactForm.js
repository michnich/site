Template.contactForm.events({
	'submit form': function(e) {
		var form = {
			first_name: $(e.target).find('[name=first_name]').val(),
			last_name: $(e.target).find('[name=last_name]').val(),
			email: $(e.target).find('[name=email]').val(),
			type: $(e.target).find('[name=type]:checked').val(),
			subject: $(e.target).find('[name=subject]').val(),
			message: $(e.target).find('[name=message]').val(),
			status: 'new'
		};

		Meteor.call('requestInsert', form, function(error,result) {
			if (error) {
				return throwError(error.reason);
			}
			else {

			}
		});
	}
});
