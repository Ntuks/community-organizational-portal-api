import { Router } from 'express';
import { checkJwt } from '../middleware/auth';
import { checkRole } from '../middleware/roles';
import ProjectController from '../controllers/ProjectController';


const router = Router();

// Insert an project
router.post("/projects", [checkJwt, checkRole(["ADMIN", "Organization Manager"])], ProjectController.insert);

//Get all projects
router.get("/projects", [checkJwt, checkRole(["ADMIN", "Organization Manager"])], ProjectController.getAll);

// Get a project
router.get("/projects/:id", [checkJwt, checkRole(["ADMIN", "Organization Manager"])], ProjectController.getOneById);

// Edit a project
router.patch("/projects/:id", [checkJwt, checkRole(["ADMIN", "Organization Manager"])], ProjectController.update);

// Delete a project
router.delete("/projects/:id", [checkJwt, checkRole(["ADMIN", "Organization Manager"])], ProjectController.delete);

export default router;