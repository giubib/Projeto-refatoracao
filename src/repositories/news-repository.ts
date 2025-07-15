import prisma from "../database";
import { News } from "@prisma/client";
import { DEFAULT_PAGE_SIZE, DEFAULT_ORDER } from "../config/constants";

export type CreateNewsData = Omit<News, "id" | "createAt">;
export type UpdateNewsData = Partial<CreateNewsData>;

export interface FindManyParams {
  page?: number;
  order?: "asc" | "desc";
  title?: string;
}

export async function findMany({ page = 1, order = DEFAULT_ORDER, title }: FindManyParams = {}) {
  const take = DEFAULT_PAGE_SIZE;
  const skip = (page - 1) * take;

  return prisma.news.findMany({
    where: title ? { title: { contains: title, mode: "insensitive" } } : undefined,
    orderBy: { publicationDate: order },
    take,
    skip,
  });
}

export function findById(id: number) {
  return prisma.news.findUnique({ where: { id } });
}

export function create(data: CreateNewsData) {
  return prisma.news.create({ data });
}

export function update(id: number, data: UpdateNewsData) {
  return prisma.news.update({ where: { id }, data });
}

export function remove(id: number) {
  return prisma.news.delete({ where: { id } });
}
