Template.studentList.onCreated(function() {
	Meteor.subscribe("allStudents");
});

Template.studentList.helpers({
	student: function() {
		return Students.find();
	}
})