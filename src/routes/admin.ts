import { Router } from 'express';
import { checkJwt } from '../middleware/auth';
import { checkRole } from '../middleware/roles';
import AdminController from '../controllers/AdminController';

const router = Router();

// // Get an organization manager
// router.get("/admin/:id", [checkJwt, checkRole(["ADMIN", "OrgManager"])], AdminController.getOneById);

// // Edit an organization manager
// router.patch("/admin/:id", [checkJwt, checkRole(["ADMIN", "OrgManager"])], AdminController.update);

// // Delete an organization manager
// router.patch("/admin/:id/organization", [checkJwt, checkRole(["ADMIN", "OrgManager"])], AdminController.delete);

router.patch("/admin/:id/organization/activate", [checkJwt, checkRole(["ADMIN"])], AdminController.actOrDeactOrg);
router.patch("/admin/:id/organization/deactivate", [checkJwt, checkRole(["ADMIN"])], AdminController.actOrDeactOrg);
export default router;