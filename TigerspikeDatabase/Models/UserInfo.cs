using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace TigerspikeDatabase.Models
{
    public class UserInfo
    {
        public string Id { get; set; }
        [Required]
        public string FirstName { get; set; }
        [Required]
        public string LastName { get; set; }
        [Required]
        public string Email { get; set; }
        public IReadOnlyList<UserLocation> Locations { get; set; } 
    }
}
