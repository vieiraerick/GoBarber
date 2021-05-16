import { Request, Response } from "express";
import Place from "../models/Place";
import placeView from "../views/placesView";
import * as Yup from "yup";

import { getRepository } from "typeorm";

export default {
  async show(req: Request, res: Response) {
    const { id } = req.params;
    const placesRepository = getRepository(Place);

    const place = await placesRepository.findOneOrFail(id, {
      relations: ["images"],
    });

    return res.json(placeView.render(place));
  },

  async index(req: Request, res: Response) {
    const placesRepository = getRepository(Place);

    const places = await placesRepository.find({
      relations: ["images"],
    });

    return res.json(placeView.renderMany(places));
  },

  async create(req: Request, res: Response) {
    const { name, latitude, longitude } = req.body;

    const placesRepository = getRepository(Place);

    const requestImages = req.files as Express.Multer.File[];
    const images = requestImages.map((image) => {
      return { path: image.filename };
    });

    const data = {
      name,
      latitude,
      longitude,
      images,
    };

    const schema = Yup.object().shape({
      name: Yup.string().required(),
      latitude: Yup.number().required(),
      longitude: Yup.number().required(),
      images: Yup.array(
        Yup.object().shape({
          path: Yup.string(),
        })
      ),
    });

    await schema.validate(data, {
      abortEarly: false,
    });

    const place = await placesRepository.create(data);

    await placesRepository.save(place);
    return res.status(201).json(place);
  },
};
