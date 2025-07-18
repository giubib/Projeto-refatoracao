import Joi from "joi";
import { CreateNewsData } from "../repositories/news-repository";

export const newsSchema = Joi.object<CreateNewsData>({
  title: Joi.string().trim().required(),
  text: Joi.string().trim().required(),
  author: Joi.string().trim().required(),
  firstHand: Joi.boolean().optional(),
  publicationDate: Joi.date().iso().required(),
});
