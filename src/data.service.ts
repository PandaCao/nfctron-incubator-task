import { Injectable } from '@nestjs/common';
import { faker } from '@faker-js/faker';
import { CustomerType } from './types';
import { CreateCustomerDto } from './dto/CreateCustomerDto';
import { UpdateCustomerDto } from './dto/UpdateCustomerDto';

@Injectable()
export class DataService {
    private customers: CustomerType[] = Array.from({ length: 5 }, (): CustomerType => {
        const firstName: string = faker.person.firstName();
        const lastName: string = faker.person.lastName();

        return {
            id: faker.string.uuid(),
            firstName: firstName,
            lastName: lastName,
            email: faker.internet.email({ firstName, lastName }),
            phone: faker.phone.number(),
        };
    });

    getCustomers(): CustomerType[] {
        return this.customers;
    }

    getCustomerByUuid(uuid: string): CustomerType | undefined {
        return this.customers.find((customer: CustomerType): boolean => customer.id === uuid);
    }

    createCustomer(customer: CreateCustomerDto): void {
        this.customers.push({
            id: faker.string.uuid(),
            firstName: customer.firstName,
            lastName: customer.lastName,
            email: customer.email,
            phone: customer.phone
        });
    }

    updateCustomerByUuid(uuid: string, updatedCustomer: UpdateCustomerDto): CustomerType | undefined {
        const index: number = this.customers.findIndex((customer: CustomerType): boolean => customer.id === uuid);

        if (index === -1) {
            return undefined;
        }

        this.customers[index] = { ...this.customers[index], ...updatedCustomer };

        return this.customers[index];
    }

}
