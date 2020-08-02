using System;

namespace TigerspikeCodeChallenge.Models
{
    public class UserLocationAddModel
    {
        public string UserId { get; set; }
        public string LocationId { get; set; }
        public string AddressLine1 { get; set; }
        public string AddressLine2 { get; set; }
        public string Suburb { get; set; }
        public string State { get; set; }
        public string City { get; set; }
        public string Country { get; set; }
        public string Postcode { get; set; }
        public double Latitude { get; set; }
        public double Longitude { get; set; }
        public bool IsCurrent { get; set; }
        public string Notes { get; set; }
    }
}
