import { Router } from 'express';
import { checkJwt } from '../middleware/auth';
import { checkRole } from '../middleware/roles';
import CampaignController from '../controllers/CampaignController';

const router = Router();

// Insert an project
router.post("/campaigns", [checkJwt, checkRole(["ADMIN", "Organization Manager"])], CampaignController.insert);

//Get all campaigns
router.get("/campaigns", [checkJwt, checkRole(["ADMIN", "Organization Manager"])], CampaignController.getAll);

// Get a campaign
router.get("/campaigns/:id", [checkJwt, checkRole(["ADMIN", "Organization Manager"])], CampaignController.getOneById);

// Edit a campaign
router.patch("/campaigns/:id", [checkJwt, checkRole(["ADMIN", "Organization Manager"])], CampaignController.update);

// Delete a campaign
router.delete("/campaigns/:id", [checkJwt, checkRole(["ADMIN", "Organization Manager"])], CampaignController.delete);

export default router;