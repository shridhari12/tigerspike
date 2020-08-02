using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace TigerspikeDatabase.Models
{
    public class UserLocation
    {
        public string Id { get; set; }
        [ForeignKey("UserInfo")]
        public string UserId { get; set; }
        [Required]
        public string AddressLine1 { get; set; }
        public string AddressLine2 { get; set; }
        [Required]
        public string Postcode { get; set; }
        [Required]
        public string Suburb { get; set; }
        public bool isCurrent { get; set; }
        [Required]
        public string State { get; set; }
        [Required]
        public string City { get; set; }
        [Required]
        public string Country { get; set; }
        [Required]
        public string Notes { get; set; }
        public double Latitude { get; set; }
        public double Longitude { get; set; }
        public UserInfo UserInfo { get; set; }
    }
}
