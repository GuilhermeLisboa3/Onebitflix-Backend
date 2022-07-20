import express from "express";
import { authController } from "./controllers/authController";
import { categoriesController } from "./controllers/categoriesController";
import { coursesController } from "./controllers/coursesController";
import { episodesController } from "./controllers/episodesController";
const router = express.Router();

//rotas para o user
router.post('/auth/register',authController.resgiter)

//rotas de categorias
router.get("/categories", categoriesController.index);
router.get("/categories/:id", categoriesController.show);

//rotas dos cursos
router.get("/courses/featured", coursesController.featured);
router.get("/courses/newest", coursesController.newest);
router.get("/courses/search", coursesController.search);
router.get("/courses/:id", coursesController.show);


//rotas do episodeios
router.get('/episodes/stream', episodesController.stream)

export { router };
