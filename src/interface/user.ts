import { Document } from 'mongoose'

export default interface IUser extends Document {
    name: string;
    password: string;
    dob: string;
    address:string;
    description:string;
}
