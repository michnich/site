Template.volunteerItemModal.events({
	'click #volunteer':function(e) {
		var volunteerId = $(e.target).value;
		console.log(volunteerId);
		var volunteer = Volunteers.findOne({_id: volunteerId});
		Session.set('selectedVolunteer', volunteer);
	}
})