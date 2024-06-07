import { Schema, model } from 'mongoose';
import {
  Guardian,
  LocalGuardian,
  TStudent,
  UserName,
} from '../student/student.interface';

const userNameSchema = new Schema<UserName>({
  firstName: {
    type: String,
    required: true,
  },
  middleName: {
    type: String,
  },
  lastName: {
    type: String,
    required: true,
  },
});

const guardianSchema = new Schema<Guardian>({
  fatherName: {
    type: String,
    required: true,
  },
  fatherOccupation: {
    type: String,
    required: true,
  },
  fatherContactNo: {
    type: String,
    required: true,
  },
  motherName: {
    type: String,
    required: true,
  },
  motherOccupation: {
    type: String,
    required: true,
  },
  motherContactNo: {
    type: String,
    required: true,
  },
});

const localGuradianSchema = new Schema<LocalGuardian>({
  name: {
    type: String,
    required: true,
  },
  occupation: {
    type: String,
    required: true,
  },
  contactNo: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
});

const studentSchema = new Schema<TStudent>(
  {
    id: {
      type: String,
      required: [true, 'Student ID is required!'],
      unique: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      required: [true, 'User ID is required!'],
      unique: true,
      ref: 'User',
    },
    
    name: userNameSchema,
    gender: ['male', 'female'],
    dateOfBirth: { type: String },
    email: { type: String, required: true },
    contactNo: { type: String, required: true },
    emergencyContactNo: { type: String, required: true },
    bloodGroup: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
    presentAddress: { type: String, required: true },
    permanentAddress: { type: String, required: true },
    guardian: guardianSchema,
    localGuardian: localGuradianSchema,
    profileImg: { type: String },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    toJSON: {
      virtuals: true, // include built-in virtual `id`
    },
  },
);

// virtual
studentSchema.virtual("fullName").get(function () {
  return (
    `${this.name.firstName} ${this.name.middleName} ${this.name.lastName}`
  )
})


// Query middleware

studentSchema.pre("find", function (next) {
  this.find({ isDeleted: { $ne: true } })
  next();
})
studentSchema.pre("aggregate", function (next) {
  this.pipeline().unshift({ $match: { isDelted: { $ne: true } } })
  next();
})
studentSchema.pre("findOne", function (next) {
  this.find({ isDeleted: { $ne: true } })
  next();
})

// studentSchema.virtual("fullName", get(function () {
//   return this.name.firstName + this.name.middleName + this.name.lastName
// }))

// const User = model<IUser>('User', userSchema);

studentSchema.methods.isUserExist = async function (id: string) {
  const existingUser = await StudentModel.findOne({ id });
  return existingUser
}

export const StudentModel = model<TStudent>('Student', studentSchema);
