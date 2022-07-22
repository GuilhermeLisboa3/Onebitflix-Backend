import { Response } from "express";
import { AuthenticatedRequest } from "../middlewares/auth";
import { likeService } from "../services/likeService";

export const likeController = {
  create: async (req: AuthenticatedRequest, res: Response) => {
    const userId = req.user!.id;
    const { courseId } = req.body;

    try {
      const likeCourse = await likeService.create(userId, courseId);

      return res.status(201).json(likeCourse);
    } catch (err) {
      if (err instanceof Error) {
        return res.status(400).json({ message: err.message });
      }
    }
  },

  delete: async (req: AuthenticatedRequest, res: Response) => {
    const userId = req.user!.id;
    const courseId  = req.params.id;
    try {
      await likeService.delete(userId, Number(courseId));

      return res.status(201).send();
    } catch (err) {
      if (err instanceof Error) {
        return res.status(400).json({ message: err.message });
      }
    }
  },
};
