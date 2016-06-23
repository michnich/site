if (Meteor.isClient) {
    $.validator.setDefaults({
        highlight: function(element) {
            $(element).closest('.form-group').addClass('has-error');
        },
        unhighlight: function(element) {
            $(element).closest('.form-group').removeClass('has-error');
        },
        errorElement: 'span',
        errorClass: 'help-block',
        errorPlacement: function(error, element) {
            if (element.is(":radio") || element.is(":checkbox")) {
                error.appendTo(element.parents('.form-group'));
            } else { // default behavior
                error.insertAfter(element);
            }
        },
        rules: {
            dob: {
                date: true
            },
            email: {
                email: true
            },
            phone: {
                phoneUS: true
            },
            eme_number: {
                phoneUS: true
            },
            //volunteer only fields
            park_check_date: {
                date: true
            },
            pa_criminal_check_date: {
                date: true
            },
            pa_child_check_date: {
                date: true
            },
            fbi_check_date: {
                date: true
            }
        },
        messages: {
            first_name: {
                required: "Enter a first name"
            },
            last_name: {
                required: "Enter a last name"
            },
            dob: {
                required: "Enter a date of birth",
                date: "Invalid date"
            },
            race_ethnicity: {
              required: "Please choose at least one"
            },
            gender: {
              required: "Please choose at least one"
            },
            email: {
                required: "Enter an email address",
                email: "Invalid email address"
            },
            phone: {
                required: "Enter a phone number",
                phoneUS: "Invalid phone number"
            },
            enrolledPrograms: {
                required: "Please select at least one program"
            },
            pictures_allowed: {
                required: "Select an option"
            },
            address1: {
                required: "Enter an address"
            },
            city: {
                required: "Enter a city"
            },
            state: {
                required: "Enter a state"
            },
            zip: {
                required: "Enter a zip code"
            },
            eme_contact: {
                required: "Enter an emergency contact name"
            },
            eme_number: {
                required: "Enter an emergency contact number"
            },
            //volunteer only required fields
            employer: {
                required: "Enter name of employer"
            },
            position: {
                required: "Enter position title"
            },
            park_check: {
                required: "Have you completed your Parks & Rec background check?"
            },
            park_check_date: {
                required: "Enter completion date",
                date: "Invalid date"
            },
            pa_criminal_check: {
                required: "Have you completed your PA Criminal background check?"
            },
            pa_child_check_date: {
                required: "Enter completion date",
                date: "Invalid date"
            },
            pa_child_check: {
                required: "Have you completed your PA Child Abuse History Clearance?"
            },
            pa_child_check_date: {
                required: "Enter completion date",
                date: "Invalid date"
            },
            fbi_check: {
                required: "Have you completed your FBI Criminal background check?"
            },
            fbi_check_date: {
                required: "Enter completion date",
                date: "Invalid date"
            }
        }
    });

    // Add US Phone Validation
    jQuery.validator.addMethod('phoneUS', function(phone_number, element) {
        phone_number = phone_number.replace(/\s+/g, '');
        return this.optional(element) || phone_number.length > 9 &&
            phone_number.match(/^(1-?)?(\([2-9]\d{2}\)|[2-9]\d{2})-?[2-9]\d{2}-?\d{4}$/);
    }, 'Please enter a valid phone number.');
}
