import { likeController } from "./controllers/likeController";
import { favoriteController } from "./controllers/favoriteController";
import express from "express";
import { authController } from "./controllers/authController";
import { categoriesController } from "./controllers/categoriesController";
import { coursesController } from "./controllers/coursesController";
import { episodesController } from "./controllers/episodesController";
import { ensureAuth, ensureAuthViaQuery } from "./middlewares/auth";
const router = express.Router();

//rotas para o user
router.post("/auth/register", authController.resgiter);
router.post("/auth/login", authController.login);

//rotas de categorias
router.get("/categories", ensureAuth, categoriesController.index);
router.get("/categories/:id", ensureAuth, categoriesController.show);

//rotas dos cursos
router.get("/courses/popular", ensureAuth, coursesController.popular);
router.get("/courses/featured", ensureAuth, coursesController.featured);
router.get("/courses/newest", coursesController.newest);
router.get("/courses/search", ensureAuth, coursesController.search);
router.get("/courses/:id", ensureAuth, coursesController.show);

//rotas do episodeios
router.get("/episodes/stream", ensureAuthViaQuery, episodesController.stream);

//rotas de favorito
router.post("/favorites", ensureAuth, favoriteController.save);
router.get("/favorites", ensureAuth, favoriteController.index);
router.delete("/favorites/:id", ensureAuth, favoriteController.delete);

//rota do like
router.post("/likes", ensureAuth, likeController.create);
router.delete("/likes/:id", ensureAuth, likeController.delete);

export { router };
