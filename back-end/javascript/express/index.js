const express = require('express')
const chargebee = require("chargebee")
// CORS is enabled only for demo. Please dont use this in production unless you know about CORS
const cors = require('cors')

chargebee.configure({site : "clinikk-test", 
  api_key : "test_9oEAtQC3XfB4edF1udIbJS46Ne0ynHVJ"});
const app = express()

app.use(express.urlencoded())
app.use(cors())

app.post("/api/generate_checkout_new_url", (req, res) => {
  chargebee.subscription.create_with_items("AzyzdwT2IpVORAaW",{
  subscription_items : [
    {
      item_price_id : "minichoco-INR-monthly",
      unit_price : 1000,
      quantity : 1
    },]
}).request(function(error,result) {
  if(error){
    //handle error
    console.log(error);
  }else{
    console.log(result);
    var subscription = result.subscription;
    var customer = result.customer;
    var card = result.card;
    var invoice = result.invoice;
    var unbilled_charges = result.unbilled_charges;
  }
});
});


app.get('/', (req, res) => res.send('Hello World!'))

app.listen(8000, () => console.log('Example app listening on port 8000!'))
