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
	//shows the input field if the user clicks "other"
	'click #other': function(e) {
		e.preventDefault();
		$("#otherAmount").show();
	},
	//sets the donation amount that will be passed to stripe when button is clicked
	'click [data-service]': function(e) {
		Template.instance().donationAmount.set(e.target.dataset.service);
	},
	//animates in the payment options
	//hides the input field for other if they click another button
	'click .amountButton': function(e) {
		e.preventDefault();
		if (!(this.id == "other")) {
			$("#otherAmount").hide();
		}
		$("#paymentOptions").show();
	},
	//opens stripe checkout for payment
	'click #stripe': function(e) {
		var donationAmount = parseInt(Template.instance().donationAmount.get());
		Template.instance().checkout.open({
	      name: 'Coded by Kids',
	      description: "Please check the amount below.",
	      amount: donationAmount
    	});
	}
});