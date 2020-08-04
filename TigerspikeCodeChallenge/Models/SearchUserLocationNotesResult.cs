using System.Collections.Generic;
using TigerspikeDatabase.Models;

namespace TigerspikeCodeChallenge.Models
{
    public class SearchUserLocationNotesResult
    {
        public UserInfo UserInfo { get; set; }
        public IReadOnlyList<UserLocation> MatchingLocations { get; set; }
    }
}
