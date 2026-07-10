const foodModel = require('../models/food.model');
const storageService = require('../services/storage.service');
const likeModel = require("../models/likes.model");
const saveModel = require("../models/save.model");
const { v4: uuid } = require("uuid");

const catchAsync = (fn) => (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
};

const createFood = catchAsync(async (req, res, next) => {
    const fileUploadResult = await storageService.uploadFile(req.file.buffer, uuid());

    const foodItem = await foodModel.create({
        name: req.body.name,
        description: req.body.description,
        video: fileUploadResult.url,
        foodPartner: req.foodPartner._id
    });

    res.status(201).json({
        message: "food created successfully",
        food: foodItem
    });
});

const getFoodItems = catchAsync(async (req, res, next) => {
    const foodItems = await foodModel.find({});
    res.status(200).json({
        message: "Food items fetched successfully",
        foodItems
    });
});

const likeFood = catchAsync(async (req, res, next) => {
    const { foodId } = req.body;
    const user = req.user;

    const isAlreadyLiked = await likeModel.findOne({
        user: user._id,
        food: foodId
    });

    if (isAlreadyLiked) {
        await likeModel.deleteOne({ user: user._id, food: foodId });
        await foodModel.findByIdAndUpdate(foodId, { $inc: { likeCount: -1 } });
        return res.status(200).json({ message: "Food unliked successfully" });
    }

    const like = await likeModel.create({ user: user._id, food: foodId });
    await foodModel.findByIdAndUpdate(foodId, { $inc: { likeCount: 1 } });

    res.status(201).json({
        message: "Food liked successfully",
        like
    });
});

const saveFood = catchAsync(async (req, res, next) => {
    const { foodId } = req.body;
    const user = req.user;

    const isAlreadySaved = await saveModel.findOne({
        user: user._id,
        food: foodId
    });

    if (isAlreadySaved) {
        await saveModel.deleteOne({ user: user._id, food: foodId });
        await foodModel.findByIdAndUpdate(foodId, { $inc: { savesCount: -1 } });
        return res.status(200).json({ message: "Food unsaved successfully" });
    }

    const save = await saveModel.create({ user: user._id, food: foodId });
    await foodModel.findByIdAndUpdate(foodId, { $inc: { savesCount: 1 } });

    res.status(201).json({
        message: "Food saved successfully",
        save
    });
});

const getSaveFood = catchAsync(async (req, res, next) => {
    const user = req.user;
    const savedFoods = await saveModel.find({ user: user._id }).populate('food');

    if (!savedFoods || savedFoods.length === 0) {
        return res.status(404).json({ message: "No saved foods found" });
    }

    res.status(200).json({
        message: "Saved foods retrieved successfully",
        savedFoods
    });
});

module.exports = {
    createFood,
    getFoodItems,
    likeFood,
    saveFood,
    getSaveFood
};