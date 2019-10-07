const stripe = require('stripe')('sk_test_N77Y1NnYyGeXc5izKzPgmrnT009hXTKwd4');
stripe.charges.create({
  amount: 400000,
  currency: "hkd",
  source:'tok_visa',
  description: "Charge for jenny.rosen@example.com"
}, function(err, charge) {
  console.log(charge);
  console.log(err);
});