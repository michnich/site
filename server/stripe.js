let Stripe = StripeAPI(Meteor.settings.private.stripe);

Meteor.methods({
  //charges card throuh stripe
  processPayment(charge) {
    check( charge, {
      amount: Number,
      currency: String,
      source: String,
      description: String,
      receipt_email: String
    });

    let handleCharge = Meteor.wrapAsync(Stripe.charges.create, Stripe.charges);

    try {
      response = handleCharge(charge);    
      return response;
    }
    catch(error) {
      console.log(error);
      return error;
    }
  }
});