import prisma from "../database";
import * as newsRepository from "../repositories/news-repository";
import { CreateNewsData, UpdateNewsData } from "../repositories/news-repository";
import { DEFAULT_ORDER } from "../config/constants";

const MIN_TEXT_LENGTH = 500;

export interface ListNewsQuery {
  page?: string | number;
  order?: string;
  title?: string;
}

export async function listNews(query: ListNewsQuery = {}) {
  const page = Number(query.page) > 0 ? Number(query.page) : 1;
  const order = query.order === "asc" ? "asc" : DEFAULT_ORDER;
  return newsRepository.findMany({ page, order, title: query.title });
}

export async function getNewsById(id: number) {
  const news = await newsRepository.findById(id);
  if (!news) throwNotFound(id);
  return news;
}

export async function createNews(data: CreateNewsData) {
  await validateNewsData(data);
  return newsRepository.create(data);
}

export async function alterNews(id: number, data: UpdateNewsData) {
  const current = await getNewsById(id);
  const titleChanged = data.title && data.title !== current.title;
  await validateNewsData({ ...current, ...data } as CreateNewsData, titleChanged);
  return newsRepository.update(id, data);
}

export async function deleteNews(id: number) {
  await getNewsById(id);
  return newsRepository.remove(id);
}

async function validateNewsData(data: CreateNewsData, checkTitle = true) {
  if (checkTitle) await ensureUniqueTitle(data.title);
  ensureMinTextLength(data.text);
  ensureFuturePublicationDate(data.publicationDate);
}

async function ensureUniqueTitle(title: string) {
  const exists = await prisma.news.findFirst({ where: { title } });
  if (exists) throwConflict(`News with title "${title}" already exists.`);
}

function ensureMinTextLength(text: string) {
  if (text.length < MIN_TEXT_LENGTH) {
    throwBadRequest(`The news text must be at least ${MIN_TEXT_LENGTH} characters long.`);
  }
}

function ensureFuturePublicationDate(date: string | Date) {
  const publicationDate = new Date(date);
  if (publicationDate < new Date()) {
    throwBadRequest("The publication date cannot be in the past.");
  }
}

function throwNotFound(id: number) {
  throw { name: "NotFound", message: `News with id ${id} not found.` };
}

function throwConflict(message: string) {
  throw { name: "Conflict", message };
}

function throwBadRequest(message: string) {
  throw { name: "BadRequest", message };
}
