import { Router } from 'express';
import { BuyerController } from './buyer.controller';

const router = Router();

router.get('/', BuyerController.getBuyers);

router.delete('/:id', BuyerController.deleteBuyer);

router.patch('/update-online-status', BuyerController.updateOnlineStatus);

export const BuyerRoutes = router;
