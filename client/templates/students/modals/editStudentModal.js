Template.editStudentModal.onCreated(function() {
    Meteor.subscribe("allStudents");
});

Template.editStudentModal.helpers({
    students: function() {
        return Students.find();
    }
});

Template.editStudentModal.events({
    'submit form': function(e) {
			e.preventDefault();
			var id = $(e.target).find("[name=selectedStudent]").val();
			Router.go('editStudent',  {_id: id});
			$("#editStudentForm #closeButton").trigger('click');
		}
});
