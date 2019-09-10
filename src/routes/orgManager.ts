import { Router } from 'express';
import { checkJwt } from '../middleware/auth';
import { checkRole } from '../middleware/roles';
import OrgManController from '../controllers/OrgManController';


const router = Router();

//Get all org-managers
router.get("/org-managers", [checkJwt, checkRole(["ADMIN"])], OrgManController.getAll);

// Get an organization manager
router.get("/org-managers/:id", [checkJwt, checkRole(["ADMIN", "Organization Managers"])], OrgManController.getOneById);

// Delete an organization manager
router.delete("/org-managers/:id", [checkJwt, checkRole(["ADMIN"])], OrgManController.delete);

export default router;