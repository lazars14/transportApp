export class Destination {
    _id: string;
    startLocation: Object;
    endLocation: Object;
    startDate: Date;
    endDate: Date;
    driversPay: number;
    numberOfKms: number;
    fuelExpenses: number;
    vehicleId: string;
    drivers: Array<string>;
    managerId: string;
    requestPerKmPrice: number;
}
