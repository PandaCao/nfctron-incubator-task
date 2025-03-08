import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class CreateCustomerDto {
    @ApiProperty({
        example: 'Vin',
        description: 'First name of the customer. This field is required.',
    })
    @IsNotEmpty()
    firstName: string;

    @ApiProperty({
        example: 'Diesel',
        description: 'Last name of the customer. This field is required.',
    })
    @IsNotEmpty()
    lastName: string;

    @ApiProperty({
        example: 'vin.diesel@example.com',
        description: 'Email address of the customer. Must be a valid email format. This field is required.',
    })
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @ApiProperty({
        example: '123456789',
        description: 'Phone number of the customer. Should be in international format. This field is required.',
    })
    @IsNotEmpty()
    phone: string;
}
