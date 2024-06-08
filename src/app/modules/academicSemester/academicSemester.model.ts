import {Schema } from 'mongoose';
import { TAcademicSemester, TMonths } from './academicSemester.interface';


export const months : TMonths[] = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

export const academicSemesterSchema = new Schema<TAcademicSemester>(
  {
    name: {
      type: String,
      required: true,
    },
    code: {
      type: String,
      required: true,
      // unique: true,
    },
    year : {
        type : Date,
        required: true,
    },
    startMonth : {
        type : String,
        enum : months,
        required: true,
    },
    endMonth : {
        type : String,
        enum : months,
        required: true,
    }
   
  },
  {
    timestamps: true, // FOR createdAt, updatedAt
  },
);