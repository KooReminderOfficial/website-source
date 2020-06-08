const express = require('express');
const braintree = require('braintree');

const fs = require('fs')

const PORT = 80;
const PREZZO_CUCU = 200.00;
const PREZZO_CAVO = 10.00;
const PREZZO_OS = 7.00;

var express_app = new express();

var gateway = braintree.connect({
    environment: braintree.Environment.Sandbox,
    merchantId: 'EH VOOLEVI!',
    publicKey: 'EH VOOLEVI!',
    privateKey: 'EH VOOLEVI!'
});

var transaction_failed = fs.readFileSync('transaction_failure.html');
var transaction_succeeded = fs.readFileSync('transaction_success.html');

express_app.use(express.static('static'));
express_app.use(express.urlencoded());

express_app.get('/', (req, res) => {
    res.redirect('/index.html');
})

express_app.get('/checkout', (req, res) => {
    // gestisci la transazione.
    res.send('wapeety beautiful');
})

express_app.post('/checkout', (req, res) => {
    // let nonceFromTheClient = req.body.payment_method_nonce;
    // let deviceData = req.body.device_data;
    let nonceFromTheClient = 'fake-paypal-one-time-nonce';
    let deviceData = null;
    let customerId = null;

    let numeroCucuComprati = null;
    let numeroCaviComprati = null;
    let numeroOSComprati = null;
    let daPagare = "0.00";

    numeroCaviComprati = parseInt(req.body.cavi);
    numeroCucuComprati = parseInt(req.body.kooreminder);
    numeroOSComprati = parseInt(req.body.os);

    if (numeroCaviComprati < 0 || numeroCucuComprati < 0 || numeroOSComprati < 0) {
        res.redirect('https://www.youtube.com/watch?v=uOa-ObWPAKg');
    }

    console.log(`cavi comprati: ${numeroCaviComprati}`);
    console.log(`cucu comprati: ${numeroCucuComprati}`);
    console.log(`os comprati: ${numeroOSComprati}`);

    daPagare = numeroCucuComprati * PREZZO_CUCU + numeroCaviComprati * PREZZO_CAVO + numeroOSComprati * PREZZO_OS;
    
    gateway.clientToken.generate(
        {},

        (err, response) => {
            if (err) {
                console.error(err);
            }

            customerId = response;
        }
    );

    gateway.transaction.sale({
        amount: daPagare.toString(),
        paymentMethodNonce: nonceFromTheClient,
        deviceData: deviceData,
        options: {

        }
    }, (error, result) => {
        if (error) {
            res.send(`<pre>Error: ${error}</pre>`);
            return;
        }

        //if (result.success) {
            res.send(`${transaction_succeeded}` + daPagare.toString());
        //} else {
        //    res.send(`${transaction_failed}`);
        //}
    });
})

// 404 pages.
express_app.get('*', (req, res) => {
    res.redirect(`https://www.youtube.com/watch?v=dQw4w9WgXcQ`);
})

express_app.post('*', (req, res) => {
    res.redirect('https://www.youtube.com/watch?v=dQw4w9WgXcQ');
})

express_app.listen(PORT, () => { console.log('Server started') })
