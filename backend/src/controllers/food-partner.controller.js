const foodPartnerModel = require('../models/foodpartner.model');
const foodModel = require('../models/food.model');

async function getFoodPartnerById(req, res) {

    const foodPartnerId = req.params.id;

    const foodPartner = await foodPartnerModel.findById(foodPartnerId)
    const foodItemsByFoodPartner = await foodModel.find({ foodPartner: foodPartnerId })

    if (!foodPartner) {
        return res.status(404).json({ message: "Food partner not found" });
    }

    res.status(200).json({
        message: "Food partner retrieved successfully",
        foodPartner: {
            ...foodPartner.toObject(),
            foodItems: foodItemsByFoodPartner
        }

    });
}

const storageService = require('../services/storage.service');
const { v4: uuid } = require('uuid');

const updateProfilePicture = async (req, res, next) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: "No image file provided" });
        }

        const foodPartnerId = req.foodPartner._id;
        const fileUploadResult = await storageService.uploadFile(req.file.buffer, uuid());

        const updatedPartner = await foodPartnerModel.findByIdAndUpdate(
            foodPartnerId,
            { profilePicture: fileUploadResult.url },
            { new: true }
        );

        res.status(200).json({
            message: "Profile picture updated successfully",
            profilePicture: updatedPartner.profilePicture
        });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getFoodPartnerById,
    updateProfilePicture
};