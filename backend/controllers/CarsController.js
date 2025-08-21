import { uploadFileToCloudinary } from "../config/cloudanary.js";
import Car from "../modals/CarModal.js";
import response from "../utils/responseHandler.js";
import { GoogleGenerativeAI } from "@google/generative-ai"

export const processCarImageWithAi = async (req, res) => {
    try {
        const file = req.file;
        if (!file) {
            return response(res, 400, "No file was Uploaded")
        }

        if (!process.env.GEMINI_API_KEY) {
            return response(res, 500, "Gemini API key is not configured or found ")
        }

        const base64Image = file.buffer.toString("base64")
        const mimeType = file.mimetype;

        if (!base64Image) {
            return response(res, 404, "wrong value ")
        }

        const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY)
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" })
        // Agar aapko Gemini ko base64 image bhejni hai, to aapko usko inlineData object ke andar dena hi padega.
        // inlineData ke andar do cheezein hoti hain:
        // data: jo aapki image ka base64 string hai
        // mimeType: image ka type(image / jpeg, image / png, etc.)
        const imagePart = {
            inlineData: {
                data: base64Image,
                mimeType: mimeType,
            }
        }

        const prompt = `
      Analyze this car image and extract:
      make, model, year, color, bodyType, mileage, fuelType, transmission, price, description, confidence (0-1)
      Format strictly as JSON.
    `;
        const result = await model.generateContent([imagePart, prompt]);
        const match = result.response.text().replace(/```(?:json)?\n?/g, "").trim().match(/{[\s\S]*}/);
        const carDetails = JSON.parse(match);

        return response(res, 200, "Car details extracted successfully", carDetails);

    } catch (error) {
        console.error("Gemini error:", error);
        return response(res, 500, "Failed to process car image", { error: error.message });
    }
}

export const addCar = async (req, res) => {
    try {
        const carData = req.body;
        const files = req.files || [];
        if (files.length === 0) {
            return response(res, 400, "atleast one image is required")
        }
        const uploadPromises = files.map((file) => uploadFileToCloudinary(file))
        const uploadedImages = Promise.all(uploadPromises)
        const imageUrls = uploadedImages.map((img) => img.secure_url);
        const newCar = new Car({
            ...carData,
            images: imageUrls,
        });
        await newCar.save();
        return response(res, 201, "Car added successfully", newCar);
    } catch (error) {
        console.error("Add car error:", error);
        return response(res, 500, "Failed to add car", { error: error.message });
    }
}

export const getCars = async (req, res) => {
    try {
        const search = req.query.search || "";
        const filter = search ? {
            $or: [
                { make: new RegExp(search, "i") },
                { model: new RegExp(search, "i") },
                { color: new RegExp(search, "i") },
            ],
        }
            : {};
        const cars = await Car.find(filter).sort({ createdAt: -1 });

        return response(res, 200, "Cars fetched successfully", cars);
    } catch (error) {
        console.error("Get cars error:", error);
        return response(res, 500, "Failed to fetch cars", { error: error.message });
    }
};

export const deleteCar = async (req, res) => {
    try {
        const { id } = req.params();

        const car = await Car.findOneAndDelete(id)
        if (!car) {
            return response(res, 404, "car not found with this id ");
        } else {
            return response(res, 200, "car deleted successfully")
        }
    } catch (error) {
        console.error("Delete car error:", error);
        return response(res, 500, "Failed to delete car", { error: error.message });
    }
}

export const updateCar = async (req, res) => {
    try {
        const { id } = req.params();
        const { status, featured } = req.body;
        const updatedata = {};
        if (status !== undefined) updatedata.status = status;
        if (featured !== undefined) updatedata.featured = featured;

        const updateCar = await Car.findByIdAndUpdate(id, updatedata, { new: true });
        if (!updatedCar) {
            return response(res, 404, "Car not found");
        }

        return response(res, 200, "Car status updated successfully", updatedCar);
    } catch (error) {
        console.error("Update car error:", error);
        return response(res, 500, "Failed to update car status", { error: error.message });
    }
};