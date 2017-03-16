Template.donate.onCreated(function() {
	//set up donation amount variable
	let template = Template.instance();
	template.donationAmount = new ReactiveVar(false);
	template.donationAmount.set(0);

	//CHECKOUT COFIGURATION
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

        	Meteor.call( 'processPayment', charge, ( error, response ) => {
        		if ( error ) {
	          		//failed
    			} else {
          			//success
        		}
      		});
    	},
	    closed() { //when checkout is completed
	      //trigger redirect to thank you page
	    }
	});
});

Template.donate.events({
	//animates in the payment options
	//hides the input field for other if they click another button
	'click .amount': function(e) {
		e.preventDefault();
		if (e.target.id == "other") {
			$("#otherAmount").show();
		}
		else {
			$("#otherAmount").hide();
			$("#paymentOptions").show();
		}
		e.target.attr('checked', true);
	},
	//opens stripe checkout for payment
	'click #stripe': function(e) {
		var donationAmount = parseInt(Template.instance().donationAmount.get());
		//if it's 0 they clicked 'other'
		//must read in amount from text input
		if (donationAmount == 0) {
			donationAmount = parseInt($("#otherAmount").value) * 100; //stripe makes charges in cents
		}
		Template.instance().checkout.open({
	      name: 'Coded by Kids',
	      description: "Please check the amount below.",
	      amount: donationAmount
    	});
	}
});