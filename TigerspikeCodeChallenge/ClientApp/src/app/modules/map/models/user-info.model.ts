import { UserLocation } from './user-location.model';

export interface UserInfo {
    userId?: string;
    userLocations: Array<UserLocation>;
}

