import { Router } from 'express';
import { VisitorController } from './visiotrs.controller';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../User/user.constant';

const router = Router();

router.get(
  '/df',
  auth(USER_ROLE.superAdmin, USER_ROLE.admin),
  VisitorController.getVisiotr,
);

router.get(
  '/',
  // auth(USER_ROLE.superAdmin, USER_ROLE.admin),
  VisitorController.getVisiotrWithFilter,
);

export const visitorRoutes = router;
