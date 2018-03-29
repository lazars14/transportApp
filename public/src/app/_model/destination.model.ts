export class Destination {
    _id: string;
    startLocation: Object;
    endLocation: Object;
    startDate: Date;
    endDate: Date;
    driversPay: Number;
    numberOfKms: Number;
    fuelExpenses: Number;
    vehicleId: string;
    drivers: Array<string>;
    managerId: string;
}
