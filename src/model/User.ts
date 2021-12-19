import { UserType } from '../interfaces/User';

/* Model Temp Table
  email: string notNull primaryKey,
  password: string notNull,
  name: string,
  location: string notNull
*/

export const Users: UserType[] = [
  {
    email: 'test@test.com',
    password: 'testpw',
    name: '한동진',
  },
  {
    email: 'test@test1.com',
    password: 'testpw',
    name: '김김김',
  },
  {
    email: 'test@test2.com',
    password: 'testpw',
    name: '귫겕굙',
  },
];
