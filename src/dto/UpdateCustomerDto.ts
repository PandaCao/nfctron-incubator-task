import { IsEmail } from 'class-validator';

export class UpdateCustomerDto {
  firstName: string;
  lastName: string;
  @IsEmail()
  email: string;
  phone: string;
}
