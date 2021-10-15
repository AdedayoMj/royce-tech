import mongoose, { Schema } from 'mongoose'
import { stringify } from 'querystring'
import IUser from '../interface/user'

const UserSchema: Schema = new Schema(
  {

    name: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    dob: { type: String, required: true  },
    address: { type: String, unique: true },
    description: { type: String, unique: true },
  },
  {
    timestamps: true
  }
)

export default mongoose.model<IUser>('User', UserSchema)
