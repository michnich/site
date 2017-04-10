Template.donate.onCreated(function() {
	//set up donation amount variable
	let template = Template.instance();
	template.donationAmount = new ReactiveVar(false);
	template.donationAmount.set(0);

	//STRIPE CHECKOUT COFIGURATION
	template.checkout = StripeCheckout.configure({
	    key: Meteor.settings.public.stripe,
	    image: 'img/logo-v5.png',
	    locale: 'auto',
	    token( token ) { //stipes pass backs token, used to complete charge
      		donation = parseInt(template.donationAmount.get());
        	charge  = {
	            amount: token.amount || donation,
	            currency: token.currency || 'usd',
	            source: token.id,
	            description: "Coded by Kids Donation",
	            receipt_email: token.email
          	};

          	//catch and set error message
        	Meteor.call( 'processPayment', charge, function(error, response) {
        		if ( error ) { 
	          		$('.alert').show();
    			} else {
          			$('#thankYou').modal('show');
        		}
      		});
    	}	
    });
});

Template.donate.onRendered(function() {
	if (Router.current().params.status === "success") {
    	$('#thankYou').modal('show');
    }
});

Template.donate.helpers({
    paypalGetAmount: function() {
      return Template.instance().donationAmount.get();
    }
});

Template.donate.events({
	//shows donate buttons, only for stripe, paypal redirects
	'click #stripe': function(e) {
		$('#donation').show();
	},

	//if they clicked other, shows hidden input field
	//hides the input field for other if they click another button
	//sets the donation amount to what they selected and launches stripe checkout
	'click .amount': function(e) {
		if (e.target.id == "other") {
			$("#otherAmount").show();
			$("#otherSubmit").show();
		}
		else {
			$("#otherAmount").hide();
			$("#otherSubmit").hide();
		}
		var amount = $('input[name=radios]:checked').val();
		Template.instance().donationAmount.set(amount);;
		Template.instance().checkout.open({
	      name: 'Coded by Kids',
	      description: "Please check the amount below.",
	      amount: donationAmount
    	});
	},

	//if they entered a custom amount, seperate submit button to launch checkout
	'click #otherSubmit': function(e) {
		var donationAmount = parseFloat($('input[name=otherAmount]').val()) * 100; //stripe makes charges in cents
		if (donationAmount > 0) {
			Template.instance().donationAmount.set(donationAmount);
			Template.instance().checkout.open({
		      	name: 'Coded by Kids',
		      	description: "Please check the amount below.",
		      	amount: donationAmount
    		});
		}
	}
});