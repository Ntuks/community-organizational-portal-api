import { Router } from 'express';
import { checkJwt } from '../middleware/auth';
import { checkRole } from '../middleware/roles';
import OrgController from '../controllers/OrgController';
import PostsController from '../controllers/PostsController';

const router = Router();

//Get all organizations
router.get("/organizations", [checkJwt, checkRole(["ADMIN"])], OrgController.getAll);

//Get all organizations
router.get("/organizations/public-data", OrgController.getAllPublic);

// 
router.get("/organizations/all-posts/", PostsController.getAllPosts);

router.get("/organizations/all-posts/:id", PostsController.getAllPostsByOrgId);

// Get an organization manager
router.get("/organizations/:id", [checkJwt, checkRole(["ADMIN", "Organization Manager"])], OrgController.getOneById);

// Edit an organization manager
router.patch("/organizations/:id", [checkJwt, checkRole(["ADMIN", "Organization Manager"])], OrgController.update);

// Delete an organization manager
router.delete("/organizations/:id", [checkJwt, checkRole(["ADMIN"])], OrgController.delete);

export default router;