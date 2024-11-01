import { Router } from 'express';
import { UserController } from './user.controller';

const router = Router();

router.post('/create-buyer', UserController.createBuyer);

router.post('/create-admin', UserController.createAdmin);

export const UserRoutes = router;
