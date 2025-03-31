import { regularExp } from '../../../config';

export class UpdateUserDto {
  constructor(public fullName: string, public email: string) {}

  static execute(object: { [key: string]: any }): [string?, UpdateUserDto?] {
    const { fullName, email } = object;

    if (!fullName) return ['full name is required'];

    if (!email) return ['email is required'];
    if (!regularExp.email.test(email)) return ['email is invalid'];

    return [
      undefined,
      new UpdateUserDto(
        fullName.trim().toLowerCase(),
        email.trim().toLowerCase()
      ),
    ];
  }
}
