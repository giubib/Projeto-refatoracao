import { Request, Response } from "express";
import httpStatus from "http-status";
import * as NewsService from "../services/news-service";
import { CreateNewsData, UpdateNewsData } from "../repositories/news-repository";

export async function getNews(req: Request, res: Response) {
  const news = await NewsService.listNews(req.query);
  res.send(news);
}

export async function getNewsById(req: Request, res: Response) {
  const id = res.locals.id as number;
  const news = await NewsService.getNewsById(id);
  res.send(news);
}

export async function createNews(req: Request, res: Response) {
  const newsData = req.body as CreateNewsData;
  const createdNews = await NewsService.createNews(newsData);
  res.status(httpStatus.CREATED).send(createdNews);
}

export async function alterNews(req: Request, res: Response) {
  const id = res.locals.id as number;
  const newsData = req.body as UpdateNewsData;
  const updatedNews = await NewsService.alterNews(id, newsData);
  res.send(updatedNews);
}

export async function deleteNews(req: Request, res: Response) {
  const id = res.locals.id as number;
  await NewsService.deleteNews(id);
  res.sendStatus(httpStatus.NO_CONTENT);
}
