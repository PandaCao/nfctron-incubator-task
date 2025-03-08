import { Controller, Get, NotFoundException, Param } from '@nestjs/common';
import { DataService } from './data.service';
import { CustomerType } from './types';

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
}
