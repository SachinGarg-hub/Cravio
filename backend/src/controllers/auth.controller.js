const userModel = require("../models/user.model")
const foodPartnerModel = require("../models/foodpartner.model")
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Helper to catch errors
const catchAsync = (fn) => (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
};

const registerUser = catchAsync(async (req, res, next) => {
    const { fullName, email, password } = req.body;

    const isUserAlreadyExists = await userModel.findOne({ email });

    if (isUserAlreadyExists) {
        const error = new Error("User already exists");
        error.statusCode = 400;
        return next(error);
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await userModel.create({
        fullName,
        email,
        password: hashedPassword
    });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

    res.cookie("token", token);

    res.status(201).json({
        message: "User registered successfully",
        user: { _id: user._id, email: user.email, fullName: user.fullName }
    });
});

const loginUser = catchAsync(async (req, res, next) => {
    const { email, password } = req.body;

    const user = await userModel.findOne({ email });

    if (!user) {
        const error = new Error("Invalid email or password");
        error.statusCode = 400;
        return next(error);
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
        const error = new Error("Invalid email or password");
        error.statusCode = 400;
        return next(error);
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

    res.cookie("token", token);

    res.status(200).json({
        message: "User logged in successfully",
        user: { _id: user._id, email: user.email, fullName: user.fullName }
    });
});

const logoutUser = catchAsync(async (req, res, next) => {
    res.clearCookie("token");
    res.status(200).json({ message: "User logged out successfully" });
});

const registerFoodPartner = catchAsync(async (req, res, next) => {
    const { name, email, password, phone, address, contactName } = req.body;

    const isAccountAlreadyExists = await foodPartnerModel.findOne({ email });

    if (isAccountAlreadyExists) {
        const error = new Error("Food partner account already exists");
        error.statusCode = 400;
        return next(error);
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const foodPartner = await foodPartnerModel.create({
        name,
        email,
        password: hashedPassword,
        phone,
        address,
        contactName
    });

    const token = jwt.sign({ id: foodPartner._id }, process.env.JWT_SECRET);

    res.cookie("token", token);

    res.status(201).json({
        message: "Food partner registered successfully",
        foodPartner: {
            _id: foodPartner._id,
            email: foodPartner.email,
            name: foodPartner.name,
            address: foodPartner.address,
            contactName: foodPartner.contactName,
            phone: foodPartner.phone
        }
    });
});

const loginFoodPartner = catchAsync(async (req, res, next) => {
    const { email, password } = req.body;

    const foodPartner = await foodPartnerModel.findOne({ email });

    if (!foodPartner) {
        const error = new Error("Invalid email or password");
        error.statusCode = 400;
        return next(error);
    }

    const isPasswordValid = await bcrypt.compare(password, foodPartner.password);

    if (!isPasswordValid) {
        const error = new Error("Invalid email or password");
        error.statusCode = 400;
        return next(error);
    }

    const token = jwt.sign({ id: foodPartner._id }, process.env.JWT_SECRET);

    res.cookie("token", token);

    res.status(200).json({
        message: "Food partner logged in successfully",
        foodPartner: { _id: foodPartner._id, email: foodPartner.email, name: foodPartner.name }
    });
});

const logoutFoodPartner = catchAsync(async (req, res, next) => {
    res.clearCookie("token");
    res.status(200).json({ message: "Food partner logged out successfully" });
});

module.exports = {
    registerUser,
    loginUser,
    logoutUser,
    registerFoodPartner,
    loginFoodPartner,
    logoutFoodPartner
};