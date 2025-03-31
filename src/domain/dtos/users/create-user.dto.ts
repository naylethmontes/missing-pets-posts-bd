import { regularExp } from '../../../config';

export class CreateUserDto {
  constructor(
    public fullName: string,
    public password: string,
    public email: string
  ) {}

  static execute(object: { [key: string]: any }): [string?, CreateUserDto?] {
    const { fullName, password, email } = object;

    if (!fullName) return ['full name is required'];
    if (!password) return ['password is required'];
    if (!regularExp.password.test(password))
      return ['format password is invalid'];

    if (!email) return ['email is required'];
    if (!regularExp.email.test(email)) return ['email is invalid'];

    return [
      undefined,
      new CreateUserDto(
        fullName.trim().toLowerCase(),
        password.trim(),
        email.trim().toLowerCase()
      ),
    ];
  }
}
