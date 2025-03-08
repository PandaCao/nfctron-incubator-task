import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { DataService } from './data.service';
import { NotFoundException } from '@nestjs/common';
import { CustomerType } from './types';
import { CreateCustomerDto } from './dto/CreateCustomerDto';
import { UpdateCustomerDto } from './dto/UpdateCustomerDto';

describe('AppControllerTest', (): void => {
    let appController: AppController;
    let dataService: DataService;

    const mockCustomers: CustomerType[] = [
        {
            id: '1',
            firstName: 'John',
            lastName: 'Cena',
            email: 'fullname@example.com',
            phone: '123456789',
        },
        {
            id: '2',
            firstName: 'Dwayne',
            lastName: 'Johnson',
            email: 'fullname@example.com',
            phone: '123456789',
        },
        {
            id: '3',
            firstName: 'Vin',
            lastName: 'Diesel',
            email: 'fullname@example.com',
            phone: '123456789',
        },
        {
            id: '4',
            firstName: 'Paul',
            lastName: 'Walker',
            email: 'fullname@example.com',
            phone: '123456789',
        },
        {
            id: '5',
            firstName: 'Kevin',
            lastName: 'Hart',
            email: 'fullname@example.com',
            phone: '123456789',
        },
    ];

    const mockDataService = {
        getCustomers: jest.fn().mockReturnValue(mockCustomers),
        getCustomerByUuid: jest.fn((uuid: string): CustomerType | undefined =>
            mockCustomers.find(
                (customer: CustomerType): boolean => customer.id === uuid,
            ),
        ),
        createCustomer: jest.fn().mockImplementation(),
        updateCustomerByUuid: jest.fn(
            (
                uuid: string,
                updatedCustomer: UpdateCustomerDto,
            ): CustomerType | undefined => {
                const index: number = mockCustomers.findIndex(
                    (customer: CustomerType): boolean => customer.id === uuid,
                );
                if (index === -1) return undefined;

                mockCustomers[index] = {
                    ...mockCustomers[index],
                    ...updatedCustomer,
                };
                return mockCustomers[index];
            },
        ),
    };

    beforeEach(async (): Promise<void> => {
        const app: TestingModule = await Test.createTestingModule({
            controllers: [AppController],
            providers: [{ provide: DataService, useValue: mockDataService }],
        }).compile();

        appController = app.get<AppController>(AppController);
        dataService = app.get<DataService>(DataService);
    });

    describe('getAllCustomers', (): void => {
        it('should return an array of 5 customers', (): void => {
            expect(appController.getAllCustomers().length).toEqual(5);
            expect(dataService.getCustomers).toHaveBeenCalled();
        });
    });

    describe('getCustomerById', (): void => {
        it('should return a customer with id 1 when found', (): void => {
            expect(appController.getCustomerById('1')).toEqual(
                mockCustomers[0],
            );
            expect(appController.getCustomerById('1').firstName).toEqual(
                'John',
            );
            expect(appController.getCustomerById('1').lastName).toEqual('Cena');
            expect(dataService.getCustomerByUuid).toHaveBeenCalledWith('1');
        });

        it('should throw NotFoundException when customer is not found with id 999', (): void => {
            expect((): CustomerType => appController.getCustomerById('999')).toThrow(
                NotFoundException,
            );
            expect(dataService.getCustomerByUuid).toHaveBeenCalledWith('999');
        });
    });

    describe('createCustomer', (): void => {
        it('should call createCustomer on DataService', (): void => {
            const newCustomer: CreateCustomerDto = {
                firstName: 'firstName',
                lastName: 'lastName',
                email: 'email@example.com',
                phone: '123456789',
            };
            appController.createCustomer(newCustomer);
            expect(dataService.createCustomer).toHaveBeenCalledWith(
                newCustomer,
            );
        });
    });

    describe('updateCustomerById', (): void => {
        it('should return updated customer when found', (): void => {
            const updateData: CreateCustomerDto = {
                firstName: 'Updated',
                lastName: 'Name',
                email: 'updated@example.com',
                phone: '123456789',
            };
            expect(appController.updateCustomerById('1', updateData)).toEqual({
                ...mockCustomers[0],
                ...updateData,
            });
            expect(dataService.updateCustomerByUuid).toHaveBeenCalledWith(
                '1',
                updateData,
            );
        });

        it('should throw NotFoundException when updating non-existent customer', (): void => {
            const updateData = new UpdateCustomerDto();
            expect((): CustomerType => appController.updateCustomerById('999', updateData)).toThrow(
                NotFoundException,
            );
            expect(dataService.updateCustomerByUuid).toHaveBeenCalledWith(
                '999',
                updateData,
            );
        });
    });
});
