import { DataService } from './data.service';
import { CreateCustomerDto } from './dto/CreateCustomerDto';
import { UpdateCustomerDto } from './dto/UpdateCustomerDto';
import { CustomerType } from './types';

describe('DataServiceTest', (): void => {
    let service: DataService;

    beforeEach((): void => {
        service = new DataService();
    });

    it('should retrieve all customers', (): void => {
        const customers: CustomerType[] = service.getCustomers();

        expect(customers.length).toBe(5);
    });

    it('should retrieve a customer by UUID', (): void => {
        const customer: CustomerType = service.getCustomers()[0];
        const foundCustomer: CustomerType | undefined = service.getCustomerByUuid(customer.id);

        expect(foundCustomer).toEqual(customer);
    });

    it('should return undefined for a non-existing UUID', (): void => {
        expect(service.getCustomerByUuid("abc")).toBeUndefined();
    });

    it('should create a new customer', (): void => {
        const newCustomer: CreateCustomerDto = {
            firstName: 'Vin',
            lastName: 'Diesel',
            email: 'vindiesel@example.com',
            phone: '123456789',
        };

        service.createCustomer(newCustomer);

        const customers: CustomerType[] = service.getCustomers()

        expect(customers.length).toBe(6);
        expect(customers[5].firstName).toBe('Vin');
        expect(customers[5].lastName).toBe('Diesel');
        expect(customers[5].email).toBe('vindiesel@example.com');
        expect(customers[5].phone).toBe('123456789');
    });

    it('should update an existing customer by UUID', (): void => {
        const customer: CustomerType = service.getCustomers()[0];
        const updatedData: UpdateCustomerDto = { firstName: 'Thomas' };
        const updatedCustomer: CustomerType | undefined = service.updateCustomerByUuid(customer.id, updatedData);

        expect(updatedCustomer?.firstName).toBe('Thomas');
    });

    it('should return undefined when updating a non-existing customer', (): void => {
        expect(service.updateCustomerByUuid('non-existing-id', { firstName: 'Updated' })).toBeUndefined();
    });
});
