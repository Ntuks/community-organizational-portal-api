import { Router } from 'express';
import { checkJwt } from '../middleware/auth';
import { checkRole } from '../middleware/roles';
import EventController from '../controllers/EventController';

const router = Router();

// Insert an event
router.post("/events", [checkJwt, checkRole(["ADMIN", "Organization Manager"])], EventController.insert);

// Get all events
router.get("/events", [checkJwt, checkRole(["ADMIN", "Organization Manager"])], EventController.getAll);

// Get an event
router.get("/events/:id", [checkJwt, checkRole(["ADMIN", "Organization Manager"])], EventController.getOneById);

// Edit an event
router.patch("/events/:id", [checkJwt, checkRole(["ADMIN", "Organization Manager"])], EventController.update);

// Delete an event
router.delete("/events/:id", [checkJwt, checkRole(["ADMIN", "Organization Manager"])], EventController.delete);

export default router;