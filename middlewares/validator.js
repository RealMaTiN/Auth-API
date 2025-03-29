const yup = require('yup');

const registerSchema = yup.object({
    fullname: yup.string().min(4).max(32).required("Fullname field is required!"),
    email: yup.string().email().required("Email field is required!"),
    password: yup.string().min(6).max(32).required("Password field is required!"),
    confirmPassword: yup.string().oneOf([yup.ref("password"), null], "Password and confirm-password are not alike!").required("ConfirmPassword field is required!")
});

const loginSchema = yup.object({
    email: yup.string().email().required("Email field is required!"),
    password: yup.string().min(6).max(32).required("Password field is required!"),
});

const forgetPasswordSchema = yup.object({
    email: yup.string().email().required("Email field is required!")
});

const resetPasswordSchema = yup.object({
    password: yup.string().min(6).max(32).required("Password field is required!"),
    confirmPassword: yup.string().oneOf([yup.ref("password"), null], "Password and confirm-password are not alike!").required("ConfirmPassword field is required!")
});

exports.registerValidator = async (data) => {
    await registerSchema.validate(data);
}

exports.loginValidator = async (data) => {
    await loginSchema.validate(data);
}

exports.forgetPasswordValidator = async (data) => {
    await forgetPasswordSchema.validate(data);
}

exports.resetPasswordValidator = async (data) => {
    await resetPasswordSchema.validate(data);
}