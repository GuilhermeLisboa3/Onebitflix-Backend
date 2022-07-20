import { Request, Response } from "express";
import { getPaginationParams } from "../helpers/getPaginationParams";
import { courseService } from "../services/coursesService";

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
    const {name} = req.query
    const [page, perPage] = getPaginationParams(req.query)
    try {
      if( typeof name !== 'string'){
        throw new Error('name params must be of type string')
      }
      const searchCourse = await courseService.findByName(name,page,perPage);
      return res.status(200).json(searchCourse);
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json({ message: error.message });
      }
    }
  },

  show: async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
      const course = await courseService.findByIdWithEpisodes(id);
      return res.status(200).json(course);
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json({ message: error.message });
      }
    }
  },
};
