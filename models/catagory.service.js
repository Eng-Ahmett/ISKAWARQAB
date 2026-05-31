const mongoose = require("mongoose");
const Joi = require("joi");
const catagorySchema = new mongoose.Schema({
    cat_name:{
        type: String,
        required: true
    },
    amount:{
        type:Number,
        required:true,
    },
    type:{
        type:String,
        enum:['income', 'expense','savings'],
        required:true,
    },
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    }

},{timestamps:true});

const CatagoryModel = mongoose.models.Catagory || mongoose.model('Catagory', catagorySchema);
function validateCatagory (catagory) {
    const schema = Joi.object({
        cat_name: Joi.string().required(),
        amount: Joi.number().required(),
        type: Joi.string().valid('income', 'expense','savings').required(),
        userId: Joi.string().required(),
    });
    return schema.validate(catagory);
}
module.exports = {
    CatagoryModel,
    validateCatagory
};