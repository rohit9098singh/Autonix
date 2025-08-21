import express from "express";
import authenticateUser from "../middleware/authMiddleware.js";
import {
  processCarImageWithAi,
  addCar,
  getCars,
  deleteCar,
  updateCar
} from "../controllers/CarsController.js";
import {multerMiddleware} from "../config/cloudanary.js"

const router = express.Router();

router.post("/ai/process-image",authenticateUser,  multerMiddleware.single("file"),processCarImageWithAi);

router.post("/",authenticateUser,multerMiddleware.array("files", 10),addCar);

router.get("/", getCars);

router.delete("/:id", authenticateUser, deleteCar);

router.patch("/:id", authenticateUser, updateCar);

export default router;