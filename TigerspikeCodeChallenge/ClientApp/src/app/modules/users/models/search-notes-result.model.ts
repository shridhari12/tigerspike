import { UserLocation } from './user-location.model';
import { UserInfo } from './user-info.model';

export interface SearchNotesResult {
    userInfo: UserInfo;
    matchingLocations: Array<UserLocation>;
}
