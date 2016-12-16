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
        first_name: {
            required: true,
            type: String
        },
        last_name: String,
        contact_number: String,
        home_address: String,
        post_code: String,
        home_phone: String,
        dob: String,
        share_total: String,
        national_insurance: String
    },
    loan_details: {
        desired_amount: String,
        date_required: String,
        loan_use: String,
    },
    business_details: {
        legal_name: String,
        business_address: String,
        post_code: String,
        business_phone: String,
        business_trading_date: String,
        legal_entity_type: String,
        business_tax_id: String,
        annual_revenue: String,
        bank_balance: String
    },
    how_did_you_hear_about_us: String,
    created_at: Date,
    updated_at: Date,
    hash: String,
    salt: String
});

// on every save, add the date
userSchema.pre('save', function (next) {
    // get the current date
    var currentDate = new Date();

    // change the updated_at field to current date
    this.updated_at = currentDate;

    // if created_at doesn't exist, add to that field
    if (!this.created_at)
        this.created_at = currentDate;

    next();
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
        username: this.username,
        name: this.person_details.last_name,
        exp: parseInt(expiry.getTime() / 1000)
    }, process.env.JWT_SECRET);

}

export var user = mongoose.model('user', userSchema);
