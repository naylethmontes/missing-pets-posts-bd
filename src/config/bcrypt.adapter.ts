import { genSaltSync, hashSync, compareSync, compare } from 'bcryptjs';

export const encriptAdapter = {
  hash: (password: string) => {
    const salt = genSaltSync(10);
    return hashSync(password, salt);
  },

  compare: (unHashedPassword: string, hashedPassword: string) => {
    return compareSync(unHashedPassword, hashedPassword);
  },
};
