Template.studentList.onCreated(function() {
	this.subscribe("allStudents");
	this.subscribe("allPrograms");
	Session.set("selectedProgram", "");
});

Template.studentList.helpers({
	student: function() {
		var selectedProgram = Session.get('selectedProgram');
		return Students.find({program: selectedProgram});
	},
	programs: function() {
		return Programs.find();
	}
});

Template.studentList.events({
	'change #selectProgram': function() {
		var programId = $("select[id=selectProgram]").val();
		Session.set("selectedProgram", programId);
	}
})
