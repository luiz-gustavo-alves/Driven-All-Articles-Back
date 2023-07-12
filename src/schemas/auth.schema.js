import joi from "joi";

const signUpSchema = joi.object({

    name: joi.string().max(64).required(),
    email: joi.string().max(256).required(),
    password: joi.string().min(3).max(256).required(),
    confirmPassword: joi.string().min(3).max(256).required()
});

const signInSchema = joi.object({

    email: joi.string().max(256).required(),
    password: joi.string().min(3).max(256).required(),
});

export {
    signUpSchema,
    signInSchema
};