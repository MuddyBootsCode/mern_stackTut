const Validator = require('validator');
const isEmpty = require('./is-empty');


module.exports = function validatePostInput(data){

    let errors = {};

    data.text = !isEmpty(data.text) ? data.text : "";

    if (!Validator.isLength(data.text, { min:25, max:225 })) {
        errors.text = 'Post must be at least 25 characters long';
    }

    if(Validator.isEmpty(data.text)){
        errors.text = "Post cannot be blank"
    }

    return{
        errors,
        isValid: isEmpty(errors)
    }
};