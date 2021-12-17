import { UserType, UserModifyType } from '../interfaces/User';
import { Users } from '../model/User';

export const findUser = (email: string) => {
  return Users.find((u) => u.email === email);
};

export const addUser = (userData: UserType) => {
  Users.push(userData);

  return Users;
};

const createObject = (modifyData: UserModifyType) => {
  let obj: UserModifyType = {};
  modifyData.email ? (obj['email'] = modifyData.email) : null;
  modifyData.password ? (obj['password'] = modifyData.password) : null;
  modifyData.name ? (obj['name'] = modifyData.name) : null;
  modifyData.location ? (obj['location'] = modifyData.location) : null;
  modifyData.refresh ? (obj['refresh'] = modifyData.refresh) : null;
  modifyData.intro ? (obj['intro'] = modifyData.intro) : null;

  return obj;
};

export const modifyUser = (email: string, modifyData: UserModifyType) => {
  const index = Users.findIndex((u) => u.email === email);

  Users[index] = { ...Users[index], ...createObject(modifyData) };

  return Users[index];
};

export const deleteUser = (email: string) => {
  const index = Users.findIndex((u) => u.email === email);
  Users.splice(index, 1);

  return Users;
};
