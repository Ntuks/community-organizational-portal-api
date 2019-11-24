import { Router } from 'express';
import { checkJwt } from '../middleware/auth';
import AuthController from '../controllers/AuthController';

const router = Router();

router.post("/signup", AuthController.signup);

router.post("/signin", AuthController.signin);

router.post("/signout", AuthController.signout);

router.post("/reset-request", [checkJwt], AuthController.resetRequest);

router.post("/reset-password", [checkJwt], AuthController.resetPassword);

export default router;