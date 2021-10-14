import mongoose, { Schema } from 'mongoose'
import { stringify } from 'querystring'
import IUser from '../interface/user'

const UserSchema: Schema = new Schema(
  {
    title: { type: String, unique: true },
    name: { type: String, unique: true },
    dob: { type: String },
    address: { type: String, unique: true },
    description: { type: String, unique: true }
  },
  {
    timestamps: true
  }
)

export default mongoose.model<IUser>('User', UserSchema)
