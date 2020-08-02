using System.Collections.Generic;
using TigerspikeDatabase.Models;

namespace TigerspikeCodeChallenge.Repositories
{
    public interface ITigerspikeRepository
    {
        List<UserInfo> GetAllUsers();
        UserLocation GetCurrentLocationForUser(string userId);
        UserLocation SaveNotesForUserLocation(string userId, string locationId, string notes);
        UserLocation SaveLocationForUser(string userId, string locationId, string addressLine1, 
            string addressLine2, string postcode, string suburb, string state, string city, 
            string country, double latitude, double longitude, bool isCurrent, string notes);
    }
}
