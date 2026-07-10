const express = require('express');
const foodPartnerController = require("../controllers/food-partner.controller");
const authMiddleware = require("../middlewares/auth.middleware");

const router = express.Router();


const multer = require('multer');
const upload = multer({ storage: multer.memoryStorage() });

/* /api/food-partner/:id */
router.get("/:id",
    authMiddleware.authUserMiddleware,
    foodPartnerController.getFoodPartnerById)

router.put("/profile-picture",
    authMiddleware.authFoodPartnerMiddleware,
    upload.single('image'),
    foodPartnerController.updateProfilePicture)

module.exports = router;