Template.summerCampEnrollment.onCreated(function() {
    Session.set("numberOfStudents", [1]);
});

Template.summerCampEnrollment.onRendered(function() {
    //override function to allow validation for multiple fields of the same name
    //for the students
    $.validator.prototype.checkForm = function() {
        //overriden in a specific page
        this.prepareForm();
        for (var i = 0, elements = (this.currentElements = this.elements()); elements[i]; i++) {
            if (this.findByName(elements[i].name).length != undefined && this.findByName(elements[i].name).length > 1) {
                for (var cnt = 0; cnt < this.findByName(elements[i].name).length; cnt++) {
                    this.check(this.findByName(elements[i].name)[cnt]);
                }
            } else {
                this.check(elements[i]);
            }
        }
        return this.valid();
    };

    $("#summerCampEnrollment").validate({
        rules: {
            parent_first_name: {
                required: true
            },
            parent_last_name: {
                required: true
            },
            parent_dob: {
                required: true
            },
            parent_race_ethnicity: {
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
            },
            //STUDENTS
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
            pictures_allowed: {
                required: true
            },
            program: {
                required: true
            },
            current_grade: {
                required: true
            },
            /*elm_school: {
                required: function() {
                    return ($('#current_grade').val() > 0)
                }
            },
            middle_school: {
                required: function() {
                    return ($('#current_grade').val() > 6)
                }
            },
            high_school: {
                required: function() {
                    return ($('#current_grade').val() >= 10)
                }
            },*/
            attendClass: {
                required: true
            }
        }
    });
});

Template.summerCampEnrollment.helpers({
    numberOfStudents: function() {
        return Session.get("numberOfStudents");
    }
});

Template.summerCampEnrollment.events({
    'submit form': function(e) {
        e.preventDefault();
        var parentProfile = {
            first_name: $(e.target).find('[name=parent_first_name]').val(),
            last_name: $(e.target).find('[name=parent_last_name]').val(),
            dob: $(e.target).find('[name=parent_dob]').val(),
            race_ethnicity: $(e.target).find("[name=parent_race_ethnicity]:checked").map(function() {
                if (this.value === "Other") {
                    return $(e.target).find("[name=otherRaceParentText]").val();
                } else {
                    return this.value;
                }
            }).get(),
            email: $(e.target).find('[name=email]').val(),
            phone: $(e.target).find('[name=phone]').val(),
            address1: $(e.target).find('[name=address1]').val(),
            address2: $(e.target).find('[name=address2]').val(),
            city: $(e.target).find('[name=city]').val(),
            state: $(e.target).find('[name=state]').val(),
            zip: $(e.target).find('[name=zip]').val(),
            eme_contact: $(e.target).find('[name=eme_contact]').val(),
            eme_number: $(e.target).find('[name=eme_number]').val()
            //EMPLOYMENT INFO
        }

        Meteor.call("parentInsertNoAccount", parentProfile, function(error, result){
          if(error){
            alert("Sorry! Something went wrong. Please refresh the page and try again or email us at info@codedbykids.com");
            return;
          }
        });

        //need container with this class around whole shebang
        $(".studentSection").each(function() {
          var student = {
              first_name: $(this).find('[name=first_name]').val(),
              last_name: $(this).find('[name=last_name]').val(),
              dob: $(this).find('[name=dob]').val(),
              gender: $(this).find("[name=gender]:checked").map(function() {
                  if (this.value === "Other") {
                      return $(e.target).find("[name=otherGenderText]").val();
                  } else {
                      return this.value;
                  }
              }).get(),
              race_ethnicity: $(this).find("[name=race_ethnicity]:checked").map(function() {
                  if (this.value === "Other") {
                      return $(e.target).find("[name=otherRaceText]").val();
                  } else {
                      return this.value;
                  }
              }).get(),
              program: $(this).find("[name=program]:checked").map(function() {
                  return this.value;
              }).get(),
              july_session_care: $(this).find('[name=july_session_care]:checked').val(),
              august_session_care: $(this).find('[name=august_session_care]:checked').val(),
              current_grade: $(this).find('[name=current_grade]').val(),
              elm_school: $(this).find('[name=elm_school]').val(),
              middle_school: $(this).find('[name=middle_school]').val(),
              high_school: $(this).find('[name=high_school]').val(),
              photos: $(e.target).find('[name=takePhotos]:checked').val(),
          };

          var returnId = Meteor.call("addSummerStudent", student, parentProfile.first_name, parentProfile.last_name, parentProfile.dob, function(error, result){
            if(error){
              alert("Sorry! Something went wrong. Please refresh the page and try again or email us at info@codedbykids.com");
              return;
            }
          });
        });
        Router.go('/success');
    },

    'click #anotherStudent': function(e) {
        var students = Session.get("numberOfStudents");
        var newStudent = _.last(students) + 1;
        students.push(newStudent);
        Session.set("numberOfStudents", students);
    },

    'change #otherGender': function(e) {
        $('label[name=otherGenderLabel]').toggleClass('hidden');
        $('input[name=otherGenderText]').toggleClass('hidden');
    },

    'change #otherRace': function(e) {
      $('label[name=otherRaceLabel]').toggleClass('hidden');
      $('input[name=otherRaceText]').toggleClass('hidden');
    },

    'change #otherParentRace': function(e) {
      $('label[name=otherRaceParentLabel]').toggleClass('hidden');
      $('input[name=otherRaceParentText]').toggleClass('hidden');
    },
});
