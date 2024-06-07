import config from '../../config';
import { TStudent } from '../student/student.interface';
import { StudentModel } from '../student/student.model';
import { TUser } from './user.interface';
import { UserModel } from './user.model';

const createStudentIntoDB = async (password: string, studentData: TStudent) => {
  //! create a user object
  const userData: Partial<TUser> = {};

  //! if password is not provided then use default password
  userData.role = 'student';

  userData.password = password || (config.default_password as string);

  //! set manually generated Id
  userData.id = '2030100001';

  //! create a user
  const newUser = await UserModel.create(userData);

  // console.log('newUser', newUser);

  //! create a student
  if (Object.keys(newUser).length) {
    //! set id, _id as user
    studentData.id = newUser.id; //! embedding id
    studentData.user = newUser._id; //! reference _id

    const newStudent = await StudentModel.create(studentData);
    return newStudent;
  }
};

export const UserService = {
  createStudentIntoDB,
};
