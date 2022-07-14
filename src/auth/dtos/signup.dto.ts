import { IsEmail, IsNotEmpty, IsPhoneNumber, Length } from 'class-validator';

export class SignupDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @Length(8, 15)
  password: string;

  @IsNotEmpty()
  @Length(2, 15)
  firstName: string;

  @IsNotEmpty()
  @Length(2, 15)
  lastName: string;

  @IsNotEmpty()
  @IsPhoneNumber()
  phone: string;
}
