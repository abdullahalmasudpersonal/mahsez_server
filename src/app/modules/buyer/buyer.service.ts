import { Request } from 'express';
import { Buyer } from './buyer.model';
import mongoose from 'mongoose';
import { User } from '../User/user.model';

const getBuyersIntoDB = async () => {
  return await Buyer.find()
    .select(
      '_id id name email user gender contactNo companyName city postCode  presentAddress permanentAddress profileImg createdAt onlineStatus',
    )
    .populate('user', 'role status isOnline onlineStatus');
};

const deleteBuyerIntoDB = async (req: Request) => {
  const buyerId = req.params.id;

  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    const deleteBuyerFormBuyer = await Buyer.findOneAndDelete({ _id: buyerId });

    const deleteUser = await User.deleteOne({
      _id: deleteBuyerFormBuyer?.user,
    });

    await session.commitTransaction();
    await session.endSession();
    return deleteUser;
  } catch (err: any) {
    throw new Error(err);
  }
};

const updateOnlineStatusIntoDB = async (req: Request) => {
  const user = req.body;
  return await Buyer.updateOne(
    { id: user?.userId },
    { $set: { onlineStatus: 'offline' } },
  );
};

export const BuyerServices = {
  getBuyersIntoDB,
  deleteBuyerIntoDB,
  updateOnlineStatusIntoDB,
};
