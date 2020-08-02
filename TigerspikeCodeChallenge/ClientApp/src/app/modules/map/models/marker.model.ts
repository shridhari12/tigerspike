import { AddUserLocation } from '../../users/models/add-user-location.model';

export interface Marker {
    userId?: string;
    locationId?: string;
    lat: number;
    lng: number;
    label?: string;
    draggable: boolean;
    notes?: string;
    address?: AddUserLocation;
    isCurrentLocation?: boolean;
}
