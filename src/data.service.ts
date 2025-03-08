import { Injectable } from '@nestjs/common';
import { faker } from '@faker-js/faker';
import { CustomerType} from './types';

@Injectable()
export class DataService {
    private customers: CustomerType[] = Array.from({ length: 5 }, () => {
        const firstName = faker.person.firstName();
        const lastName = faker.person.lastName();

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
        return this.customers.find((customer) => customer.id === uuid);
    }
}
