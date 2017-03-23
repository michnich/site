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
          			Router.go('thankYou');
        		}
      		});
    	}
    });
});

Template.donate.events({
	//animates in the payment options
	//hides the input field for other if they click another button
	//sets the donation amount to what they selected
	'click .amount': function(e) {
		if (e.target.id == "other") {
			$("#otherAmount").show();
		}
		else {
			$("#otherAmount").hide();
		}
		$("#paymentOptions").show();
		var amount = $('input[name=radios]:checked').val();
		Template.instance().donationAmount.set(amount);;
	},

	//opens stripe checkout for payment
	'click #stripe': function(e) {
		var donationAmount = parseInt(Template.instance().donationAmount.get());
		//if it's 0 they clicked 'other'
		//must read in amount from text input
		if (donationAmount == 0) {
			donationAmount = parseInt($('input[name=otherAmount]').val()) * 100; //stripe makes charges in cents
		}
		Template.instance().checkout.open({
	      name: 'Coded by Kids',
	      description: "Please check the amount below.",
	      amount: donationAmount
    	});
	}
});