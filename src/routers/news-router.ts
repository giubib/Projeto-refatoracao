import { Router } from "express";
import * as newsController from "../controllers/news-controller";
import { idValidator } from "../middlewares/id-validator";
import { validateSchemaMiddleware } from "../middlewares/schema-handler";
import { newsSchema } from "../schemas/news-schema";

const newsRouter = Router();

newsRouter.get("/", newsController.getNews);
newsRouter.get("/:id", idValidator, newsController.getNewsById);
newsRouter.post("/", validateSchemaMiddleware(newsSchema), newsController.createNews);
newsRouter.put("/:id", idValidator, validateSchemaMiddleware(newsSchema), newsController.alterNews);
newsRouter.delete("/:id", idValidator, newsController.deleteNews);

export default newsRouter;
