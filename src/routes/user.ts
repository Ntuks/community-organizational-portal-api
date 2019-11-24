import { Router } from 'express';
import { checkJwt } from '../middleware/auth';
import { checkRole } from '../middleware/roles';
import UserController from '../controllers/UserController';

const router = Router();

//Get all users
router.get("/users", [checkJwt, checkRole(["ADMIN"])], UserController.getAll);

// Get one user
router.get("/users/:id", [checkJwt, checkRole(["ADMIN", "Organization Managers"])], UserController.getOneById);

//Edit one user
router.patch("/users/:id", [checkJwt, checkRole(["ADMIN", "Organization Managers"])], UserController.update);

//Delete one user
router.delete("/users/:id", [checkJwt, checkRole(["ADMIN"])], UserController.delete);

export default router;