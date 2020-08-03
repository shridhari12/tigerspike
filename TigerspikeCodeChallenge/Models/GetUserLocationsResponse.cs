using System.Collections.Generic;
using TigerspikeDatabase.Models;

namespace TigerspikeCodeChallenge.Models
{
    public class GetUserLocationsResponse : AmazingCoApiResponse
    {
        public IReadOnlyList<UserLocation> Locations { get; set; }
    }
}
