import { Router } from "express";
import multer from "multer";
import uploadConfig from "./config/upload";
import PlacesController from "./controllers/PlacesController";

const routes = Router();
const upload = multer(uploadConfig);

process.on("unhandledRejection", (err) => console.error(err));

routes.post("/places", upload.array("images"), PlacesController.create);
routes.get("/places/:id", PlacesController.show);
routes.get("/places", PlacesController.index);

export default routes;
