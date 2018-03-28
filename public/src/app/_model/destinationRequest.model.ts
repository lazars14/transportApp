import { Location } from './index';

export class DestinationRequest {
    _id: string;
    startLocation: Location;
    endLocation: Location;
    startDate: Date;
    endDate: Date;
    price: Number;
    status: Number;
    destinationId: string;
    submissionDate: Date;
    confirmationRequestDate: Date;
    userId: string;
    destinationOrder: Number;
}
