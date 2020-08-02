export interface AddUserLocation {
    userId: string;
    locationId?: string;
    addressLine1: string;
    addressLine2: string;
    postcode: string;
    suburb: string;
    state: string;
    city: string;
    country: string;
    latitude: number;
    longitude: number;
    isCurrent: boolean;
    notes: string;
}
