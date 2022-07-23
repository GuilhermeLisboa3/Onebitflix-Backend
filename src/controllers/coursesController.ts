import { Request, Response } from "express";
import { getPaginationParams } from "../helpers/getPaginationParams";
import { AuthenticatedRequest } from "../middlewares/auth";
import { courseService } from "../services/coursesService";
import { favoriteService } from "../services/favoriteService";
import { likeService } from "../services/likeService";

export const coursesController = {
  featured: async (req: Request, res: Response) => {
    try {
      const featuredCourses = await courseService.getRandomFeaturedCourses();

      return res.status(200).json(featuredCourses);
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json({ message: error.message });
      }
    }
  },

  newest: async (req: Request, res: Response) => {
    try {
      const newestCourse = await courseService.getTopTenNewest();
      return res.status(200).json(newestCourse);
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json({ message: error.message });
      }
    }
  },

  search: async (req: Request, res: Response) => {
    const { name } = req.query;
    const [page, perPage] = getPaginationParams(req.query);
    try {
      if (typeof name !== "string") {
        throw new Error("name params must be of type string");
      }
      const searchCourse = await courseService.findByName(name, page, perPage);
      return res.status(200).json(searchCourse);
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json({ message: error.message });
      }
    }
  },

  show: async (req: AuthenticatedRequest, res: Response) => {
    const userId = req.user!.id;
    const courseId = req.params.id;

    try {
      const course = await courseService.findByIdWithEpisodes(courseId);

      if (!course)
        return res.status(404).json({ message: "Curso não encontrado" });

      const liked = await likeService.isLiked(userId, Number(courseId));
      const favorited = await favoriteService.isFavorited(
        userId,
        Number(courseId)
      );

      return res.json({ ...course.get(), favorited, liked });
    } catch (err) {
      if (err instanceof Error) {
        return res.status(400).json({ message: err.message });
      }
    }
  },

  popular: async (req: AuthenticatedRequest, res: Response) => {
    try {
      const topTen = await courseService.getTopTenByLikes();
      return res.json(topTen);
    } catch (err) {
      if (err instanceof Error) {
        return res.status(400).json({ message: err.message });
      }
    }
  },
};
