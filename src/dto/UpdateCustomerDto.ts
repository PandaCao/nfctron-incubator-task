import { IsEmail, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateCustomerDto {
    @ApiProperty({
        example: 'Vin',
        description: 'First name of the customer. Optional field.',
    })
    @IsOptional()
    firstName?: string;

    @ApiProperty({
        example: 'Diesel',
        description: 'Last name of the customer. Optional field.',
    })
    @IsOptional()
    lastName?: string;

    @ApiProperty({
        example: 'vin.diesel@example.com',
        description: 'Email address of the customer. Must be a valid email format. Optional field.',
    })
    @IsOptional()
    @IsEmail()
    email?: string;

    @ApiProperty({
        example: '123456789',
        description: 'Phone number of the customer. Should be in international format. Optional field.',
    })
    @IsOptional()
    phone?: string;
}
