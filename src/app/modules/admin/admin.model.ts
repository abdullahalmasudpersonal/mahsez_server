import { model, Schema } from 'mongoose';
import { TAdmin } from './admin.interface';
import { UserModel } from '../User/user.interface';
import { onlineStatus } from '../buyer/buyer.constant';

const adminSchema = new Schema<TAdmin>(
  {
    id: {
      type: String,
      required: [true, 'ID is required'],
      unique: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      required: [true, 'User id is required'],
      unique: true,
      ref: 'User',
    },
    name: {
      type: String,
      required: [true, 'Name is required'],
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
    },
    gender: {
      type: String,
      enum: {
        values: ['male', 'female', 'other'],
        message: '{VALUE} is not a valid gender',
      },
      required: [false, 'Gender is not required'],
    },
    contactNo: {
      type: String,
      required: [false, 'Contact number is not required'],
    },
    city: {
      type: String,
      required: [false, 'City is not required'],
    },
    postCode: {
      type: String,
      required: [false, 'Post Code is not required'],
    },
    companyName: {
      type: String,
      required: [false, 'Company Name is not required'],
    },
    presentAddress: {
      type: String,
      required: [false, 'Present address is not required'],
    },
    onlineStatus: {
      type: String,
      enum: onlineStatus,
      default: 'offline',
    },
    permanentAddress: {
      type: String,
      required: [false, 'Permanent address is not required'],
    },
    profileImg: { type: String, required: false },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

export const Admin = model<TAdmin>('Admin', adminSchema);
