import express from 'express'
import multer from 'multer'
import {uploadMealImage, createMeal, getMeals} from '../Controllers/mealsController'

const router = express.Router()

const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, "Uploads/"),
    filename: (req, file, cb) => cb(null, Date.now()) + "-" + file.originalname
})
const upload = multer({storage})

router.post('/upload', upload.single("image"), uploadMealImage)
router.post('/', createMeal)
router.get('/', getMeals)

export default router

