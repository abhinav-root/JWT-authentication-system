import {
  IsNotEmpty,
  IsOptional,
  IsPhoneNumber,
  IsString,
  Length,
} from 'class-validator';

export class UpdateProfileDto {
  @IsNotEmpty()
  @Length(2, 15)
  firstName?: string;

  @IsNotEmpty()
  @Length(2, 15)
  lastName?: string;

  @IsNotEmpty()
  @IsOptional()
  @IsPhoneNumber()
  phone?: string;

  @IsNotEmpty()
  @IsOptional()
  @IsString()
  profileImgUrl: string;
}
