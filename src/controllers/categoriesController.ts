import { Request, Response } from "express";
import { json } from "stream/consumers";
import { getPaginationParams } from "../helpers/getPaginationParams";
import { Category } from "../models";
import { categoryService } from "../services/categoryService";

export const categoriesController = {
  index: async (req: Request, res: Response) => {
    const [page, perPage] = getPaginationParams(req.query)
    try {
      const paginatedCategories = await categoryService.findAllPagineted(page,perPage)

      return res.json(paginatedCategories)
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json({ message: error.message });
      }
    }
  },
};
