import { Location } from './index';

export class Destination {
    _id: string;
    startLocation: Location;
    endLocation: Location;
    startDate: Date;
    endDate: Date;
    driversPay: Number;
    numberOfKms: Number;
    fuelExpenses: Number;
    vehicleId: string;
    drivers: Array<string>;
    managerId: string;
}
