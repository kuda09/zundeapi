///<reference path="../../typings/modules/mongoose/index.d.ts"/>


let mongoose = require('mongoose');
let crypto = require('crypto');
let jwt = require('jsonwebtoken');


var userSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true,
        required: true
    },
    person_details: {
        first_name: String,-
        last_name: String,
        contact_number: Number,
        home_address: String,
        post_code: String,
        dob: String,
        share_total: String,
        national_insurance: String
    },
    loan_details: {
        desired_amount: Number,
        date_required: Date,
        loan_use: String,
    },
    business_details: {
        legal_name: String,
        business_address: String,
        post_code: String,
        business_phone: String,
        business_trading_date: Date,
        legal_entity_type: String,
        business_tax_id: String,
        annual_revenue: Number,
        bank_balance: Number
    },
    how_did_you_hear_about_us: String,
    hash: String,
    salt: String
});
userSchema.methods.setPassword = function (password) {
    this.salt = crypto.randomBytes(16).toString('hex');
    this.hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64).toString('hex');

}
userSchema.methods.validPassword = function (password) {
    let hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64).toString('hex');
    return this.hash === hash;
}
userSchema.methods.generateJWT = () => {
    let expiry = new Date();
    expiry.setDate(expiry.getDate() + 7);

    return jwt.sign({
        _ids: this.id,
        email: this.email,
        name: this.name,
        exp: parseInt(expiry.getTime() /1000)
    }, process.env.JWT_SECRET);

}


export var user = mongoose.model('user', userSchema);