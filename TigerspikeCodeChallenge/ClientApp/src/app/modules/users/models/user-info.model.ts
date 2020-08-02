import { UserLocation } from './user-location.model';

export interface UserInfo {
    id?: string;
    firstName: string;
    lastName: string;
    email: string;
    locations: Array<UserLocation>;
}

