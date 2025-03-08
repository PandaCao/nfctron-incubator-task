import { Body, Controller, Get,NotFoundException,Param,Patch,Post } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { DataService } from './data.service';
import { CustomerType } from './types';
import { CreateCustomerDto } from './dto/CreateCustomerDto';
import { UpdateCustomerDto } from './dto/UpdateCustomerDto';

@ApiTags('Customers')
@Controller('api/v1/customers')
export class AppController {
    constructor(private readonly dataService: DataService) {}

    @ApiOperation({ summary: 'Get all customers' })
    @ApiResponse({ status: 200, description: 'List of customers' })
    @Get()
    getAllCustomers(): CustomerType[] {
        return this.dataService.getCustomers();
    }

    @ApiOperation({ summary: 'Get a customer by UUID' })
    @ApiParam({ name: 'uuid', description: 'Unique identifier of the customer' })
    @ApiResponse({ status: 200, description: 'Customer found' })
    @ApiResponse({ status: 404, description: 'Customer not found' })
    @Get(':uuid')
    getCustomerById(@Param('uuid') uuid: string): CustomerType {
        const customer: CustomerType | undefined =
            this.dataService.getCustomerByUuid(uuid);

        if (!customer) {
            throw new NotFoundException('Customer not found');
        }

        return customer;
    }

    @ApiOperation({ summary: 'Create a new customer' })
    @ApiResponse({ status: 201, description: 'Customer created successfully' })
    @Post('create')
    createCustomer(@Body() customer: CreateCustomerDto): void {
        this.dataService.createCustomer(customer);
    }

    @ApiOperation({ summary: 'Update a customer by UUID' })
    @ApiParam({ name: 'uuid', description: 'Unique identifier of the customer' })
    @ApiResponse({ status: 200, description: 'Customer updated successfully' })
    @ApiResponse({ status: 404, description: 'Customer not found' })
    @Patch('update/:uuid')
    updateCustomerById(
        @Param('uuid') uuid: string,
        @Body() customerDto: UpdateCustomerDto,
    ): CustomerType {
        const customer: CustomerType | undefined =
            this.dataService.updateCustomerByUuid(uuid, customerDto);

        if (!customer) {
            throw new NotFoundException(`Customer with uuid ${uuid} not found`);
        }

        return customer;
    }
}
