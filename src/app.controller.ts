import { Body, Controller, Get, NotFoundException, Param, Post } from '@nestjs/common';
import { DataService } from './data.service';
import { CustomerType } from './types';
import { CustomerDto } from './CustomerDto';

@Controller('api/v1/customers')
export class AppController {
    constructor(private readonly dataService: DataService) {}

    @Get()
    getAllCustomers() {
        return this.dataService.getCustomers();
    }

    @Get(':uuid')
    getCustomerById(@Param('uuid') uuid: string): CustomerType {
        const customer = this.dataService.getCustomerByUuid(uuid);

        if (!customer) {
            throw new NotFoundException('Customer not found');
        }

        return customer;
    }

    @Post('create')
    createCustomer(@Body() customer: CustomerDto) {
        this.dataService.createCustomer(customer);
    }
}
