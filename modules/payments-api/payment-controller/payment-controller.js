const stripe = require("stripe")("sk_test_4eC39HqLyjWDarjtT1zdp7dc");

module.exports = (app, paymentSchema) => {

    app.get('/a',(req,res)=>{
        res.send('Working')
    })

    app.post('/charges', (req, res) => {
        console.log(req.body);
        var profileId = req.body.profileId
        var amount  = req.body.amount
        var currencyCode = req.body.currency
        var sourceId = req.body.source

        var payment = new paymentSchema();
        // create a customer 
        stripe.customers.create({
            profileId : req.body.profileId, // customer email, which user need to enter while making payment
            sourceId : req.body.sourceId // token for the given card 
        }).then(customers =>
            stripe.charges.create({
            amount : req.body.amount,
            currency : req.body.currency,
            receipt_email : req.body.receipt_email,        
            source : sourceId,
        },

        function(err, charge) {
            if(err){
                payment.profileId  = profileId
                payment.transcationId = ''
                payment.amount = amount
                payment.status = 'success'
                payment.payeeId = ''
                payment.payee_profileId = ''
                payment.payerId = ''
                payment.mode = ''
                payment.type = ''
                payment.currency = currencyCode
                payment.customerID = ''
                payment.paymentTranscationId = ''
                payment.description = err.code+''+err.message
                payment.time = new Date().getTime()
                payment.payment_receipt_url = ''
                payment.country = ''  
                payment.sourceId = sourceId
            }else{
                payment.profileId  = profileId
                payment.transcationId = ''
                payment.amount = charge.amount
                payment.status = charge.status
                payment.payeeId = ''
                payment.payee_profileId = ''
                payment.payerId = ''
                payment.mode = charge.type
                payment.type = charge.payment_method_details.card.brand    
                payment.currency = charge.currency
                payment.customerID = ''
                payment.paymentTranscationId = charge.id    
                payment.description = charge.description
                payment.time = new Date().getTime()
                payment.payment_receipt_url = charge.receipt_url
                payment.country = ''  
                payment.lastFour = charge.last4
                payment.sourceId = sourceId
            }
            payment.save().then((data)=>{
                res.send({
                    data:err?err:charge,
                    status:'success'
                })
                }).catch((err)=>{
                    console.log(err);  
                    res.send({error:err})
                })
            }))
        })
    
        app.post('/createcustomer', (req, res) => {
            var name = req.body.name
            var payment = new paymentSchema();
            stripe.customers.create({
                name : req.body.name,
  
            }, function(err, customer) {
                console.log(customer);
                console.log(err);
                if(err){
                    payment.name = name
                }
                else{
                    payment.name  = name
                } 
                payment.save().then((data)=>{
                    res.send({
                        data: err?err:customer,
                        status:'success'
                    })
                }).catch((err)=>{
                        console.log(err);  
                        res.send({error:err})
                    })
                });
        });

        app.post('/updatecustomer', (req, res) => {
            stripe.customers.update(
                'cus_FWuSpFs6fyMrh2',
                {metadata: {order_id: '6735'}},
                    function(err, customer) {
                // asynchronously called
                }
            );
        });

        app.post('/createcard', (req, res) => {
            stripe.customers.createSource(
                'cus_FWwh2PRHrv4V2q',
                {
                  source: 'tok_1F1t5XEfb2aQ6137Y58rdakJ',
                },
                function(err, card) {
                  // asynchronously called
                  console.log(card);
                  
            }
        );
}


    // datenow
    // id {sender receiver}
    // stripe tran id - access the tran

// stripe.customers.update(
// 'cus_FWuSpFs6fyMrh2',
// {metadata: {order_id: '6735'}},
// function(err, customer) {
// // asynchronously called
// }
// );

//     stripe.setupIntents.create({
//         payment_method_types: ['card'],
//         customer:'cus_FWwh2PRHrv4V2q'
//     }, function(err, setupIntent) {
//         // asynchronously called
//         console.log(setupIntent);
//     });    
// })

//     stripe.charges.list(
//         { limit: 3 },
//         {customer:'null'},
//         function(err, charges) {
//         // asynchronously called
//         console.log(charges);
//     }
// );
// });

// stripe.customers.update(
//   'cus_FWuSpFs6fyMrh2',
//   {metadata: {order_id: '6735'}},
//     function(err, customer) {
//     // asynchronously called
//   }
// );

// stripe.customers.createSource(
//   'cus_FWwh2PRHrv4V2q',
//   {
//     source: 'tok_1F1t5XEfb2aQ6137Y58rdakJ',
//   },
//   function(err, card) {
//     // asynchronously called
//     console.log(card);
    
//   }
// );


// stripe.charges.retrieve(
//   "ch_1F1rJJEfb2aQ6137kvGNedz5",
//   function(err, charge) {
//     // asynchronously called
//     console.log(charge);
    
//   }
// );


// stripe.customers.retrieveSource(
//   "cus_FWwh2PRHrv4V2q",
//   "card_1F1soAEfb2aQ61371v0XHfrO",
//   function(err, card) {
//   // asynchronously called

//   console.log(card);
  
// }
// )

// stripe.customers.list(
//   { limit: 3 },
//   function(err, customers) {
//     // asynchronously called
//     console.log(customers.data[0].sources);
    
//   }
// );

// stripe.paymentIntents.create({
//   payment_method_types: ['card'],
//   amount: 20000,
//   currency: 'inr',
//   application_fee_amount: 123,
// }, {
//   stripe_account: '{{CONNECTED_STRIPE_ACCOUNT_ID}}',
// }).then(function(paymentIntent) {
//   // asynchronously called
// });

// stripe.paymentIntents.create({
//   amount: 2000,
//   currency: 'hkd',
//   payment_method_types: ['card'],
// }, function(err, paymentIntent) {
//   // asynchronously called
//   console.log(paymentIntent);
  
// });

// stripe.charges.list(
//   // { limit: 3 },
//   {customer:'cus_FWwh2PRHrv4V2q',
// status:'failed'},
//   function(err, charges) {
//     // asynchronously called
//     console.log(charges);
//   }
// );

// stripe.setupIntents.create({
//   payment_method_types: ['card'],
//   customer:'cus_FWwh2PRHrv4V2q'
// }, function(err, setupIntent) {
//   // asynchronously called
//   console.log(setupIntent);
  
// });





// stripe.customers.listSources(
//   'cus_FWwh2PRHrv4V2q',
//   {
//     // limit: 3,
//     object: 'card',
//   },
//   function(err, cards) {
//   // asynchronously called
//   console.log(cards);
// });