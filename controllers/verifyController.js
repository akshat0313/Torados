const client = require('twilio')(process.env.ACCOUNT_SID, process.env.AUTH_TOKEN);

exports.getOtp = async (req, res) => {
    console.log(req.query)
    console.log(client.verify)
    client.Verify
        .services(process.env.VERIFY_SERVICE_SID)
        .verifications
        .create({
            to: `+${req.query.phonenumber}`,
            channel: req.query.channel
        })
        .then(data => {
            console.log(data)
            res.status(200).send(data);
        })
};

exports.verifyOtp = async (req, res) => {
    client.verify
        .services(process.env.VERIFY_SERVICE_SID)
        .verificationChecks
        .create({
            to: `+${req.query.phonenumber}`,
            code: req.query.code
        })
        .then(data => {
            res.status(200).send(data);
        });
};