"use strict";

const mongoose = require('mongoose');

let Schema = mongoose.Schema;
let personalLoanSchema = new Schema({
    person_details: {
        first_name: String,
        last_name: String,
        contact_number: Number,
        email_address: String,
        home_address: String,
        post_code: String,
        dob: String,
        share_total: String,
        national_insurance: String
    },
    loan_details: {
        desired_amount: Number,
        date_required: String,
        loan_use: String
    },
    business_details: {
        legal_name: String,
        business_address: String,
        post_code: String,
        business_phone: Number,
        business_trading_date: Date,
        legal_entity_type: String,
        business_tax_id: String,
        annual_revenue: String,
        bank_balance: Number
    }
});

let personalLoan = mongoose.model('personalLoan', personalLoanSchema);

module.exports = personalLoan;