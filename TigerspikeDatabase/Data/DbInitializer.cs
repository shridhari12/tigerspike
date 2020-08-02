using Microsoft.EntityFrameworkCore.Internal;
using System;
using TigerspikeDatabase.Enums;
using TigerspikeDatabase.Models;

namespace TigerspikeDatabase.Data
{
    public static class DbInitializer
    {
        public static void Initialize(TigerspikeDbContext context)
        {
            context.Database.EnsureCreated();

            if (context.Users.Any())
            {
                return;
            }

            var user1 = new UserInfo { Id = Guid.NewGuid().ToString(), FirstName = "Shridhar", LastName = "Iyer", Email = "shridhariyer12@gmail.com" };
            var user2 = new UserInfo { Id = Guid.NewGuid().ToString(), FirstName = "Geoff", LastName = "Smith", Email = "geoff.smith@domain.com" };
            var user3 = new UserInfo { Id = Guid.NewGuid().ToString(), FirstName = "Mary", LastName = "Poppins", Email = "mary.poppins@domain.com" };
            var user4 = new UserInfo { Id = Guid.NewGuid().ToString(), FirstName = "Robert", LastName = "Haynes", Email = "robert.haynes@domain.com" };
            var users = new UserInfo[]
            {
                user1,
                user2,
                user3,
                user4
            };
            foreach(UserInfo user in users)
            {
                context.Users.Add(user);
            }
            context.SaveChanges();

            var locations = new UserLocation[]
            {
                // User 1 Location Data
                new UserLocation { Id = Guid.NewGuid().ToString(), UserId = user1.Id, AddressLine1 = "86 Chilton Street", AddressLine2 = "", Suburb = "Sunnybank Hills", 
                    Postcode = "4109", State = States.QLD.ToString(), City = "Brisbane", Country = "Australia", Latitude = -27.588730, Longitude = 153.050156, Notes = "Note 1" },
                new UserLocation { Id = Guid.NewGuid().ToString(), UserId = user1.Id, AddressLine1 = "76 Wilcox Street", AddressLine2 = "", Suburb = "Preston", 
                    Postcode = "", State = States.VIC.ToString(), City = "Melbourne",  Country = "Australia", Latitude = -37.735800, Longitude = 145.006510, Notes = "Note 2" },
                new UserLocation { Id = Guid.NewGuid().ToString(), UserId = user1.Id, AddressLine1 = "Unit 9, 158 Victoria Road", AddressLine2 = "", Suburb = "Hawthorn East", 
                    Postcode = "3123", State = States.VIC.ToString(), City = "Melbourne",  Country = "Australia", Latitude = -37.823521, Longitude = 145.056717, Notes = "Note 3" },
                new UserLocation { Id = Guid.NewGuid().ToString(), UserId = user1.Id, AddressLine1 = "999 Burke Road", AddressLine2 = "", Suburb = "Camberwell", 
                    Postcode = "3124", State = States.VIC.ToString(), City = "Melbourne",  Country = "Australia", Latitude = -37.822330, Longitude = 145.058190, Notes = "Note 4" },
                // User 2 Location Data
                new UserLocation { Id = Guid.NewGuid().ToString(), UserId = user2.Id, AddressLine1 = "405 Riley Street", AddressLine2 = "", Suburb = "Surry Hills",
                    Postcode = "2010", State = States.NSW.ToString(), City = "Sydney",  Country = "Australia", Latitude = -33.885754, Longitude = 151.212280, Notes = "Note 5" },
                new UserLocation { Id = Guid.NewGuid().ToString(), UserId = user2.Id, AddressLine1 = "101 Alice Street", AddressLine2 = "", Suburb = "Newtown",
                    Postcode = "2042", State = States.NSW.ToString(), City = "Sydney",  Country = "Australia", Latitude = -37.735800, Longitude = 145.006510, Notes = "Note 6" },
                new UserLocation { Id = Guid.NewGuid().ToString(), UserId = user2.Id, AddressLine1 = "92 Palmerston St", AddressLine2 = "", Suburb = "Perth",
                    Postcode = "6000", State = States.WA.ToString(), City = "Perth",  Country = "Australia", Latitude = -32.012791, Longitude = 115.766121, Notes = "Note 7" },
                new UserLocation { Id = Guid.NewGuid().ToString(), UserId = user2.Id, AddressLine1 = "7 Groves St", AddressLine2 = "", Suburb = "Bellamack",
                    Postcode = "0832", State = States.NT.ToString(), City = "Darwin",  Country = "Australia", Latitude = -12.513560, Longitude = 130.983902, Notes = "Note 8" },
                // User 3 Location Data
                new UserLocation { Id = Guid.NewGuid().ToString(), UserId = user3.Id, AddressLine1 = "48 McAulay St", AddressLine2 = "", Suburb = "Rosebury",
                    Postcode = "0832", State = States.NT.ToString(), City = "Darwin",  Country = "Australia", Latitude = -12.511460, Longitude = 130.988434, Notes = "Note 9" },
                new UserLocation { Id = Guid.NewGuid().ToString(), UserId = user3.Id, AddressLine1 = "33 Jervois St", AddressLine2 = "", Suburb = "Torrensville",
                    Postcode = "5031", State = States.SA.ToString(), City = "Adelaide",  Country = "Australia", Latitude = -34.919617, Longitude = 138.560608, Notes = "Note 10" },
                new UserLocation { Id = Guid.NewGuid().ToString(), UserId = user3.Id, AddressLine1 = "14C Haddon St", AddressLine2 = "", Suburb = "Hackett",
                    Postcode = "2602", State = States.ACT.ToString(), City = "Canberra",  Country = "Australia", Latitude = -35.247009, Longitude = 149.163910, Notes = "Note 11" },
                new UserLocation { Id = Guid.NewGuid().ToString(), UserId = user4.Id, AddressLine1 = "250 Campbell St", AddressLine2 = "", Suburb = "Rockhampton",
                    Postcode = "4700", State = States.QLD.ToString(), City = "Brisbane",  Country = "Australia", Latitude = -23.380924, Longitude = 150.506973, Notes = "Note 12" },
                // User 4 Location Data
                new UserLocation { Id = Guid.NewGuid().ToString(), UserId = user4.Id, AddressLine1 = "71 The Esplanade", AddressLine2 = "", Suburb = "Guildford",
                    Postcode = "2161", State = States.NSW.ToString(), City = "Sydney",  Country = "Australia", Latitude = -33.852272, Longitude = 150.981964, Notes = "Note 13" },
                new UserLocation { Id = Guid.NewGuid().ToString(), UserId = user4.Id, AddressLine1 = "6 Dalley St", AddressLine2 = "", Suburb = "Coffs Harbour",
                    Postcode = "2450", State = States.NSW.ToString(), City = "Sydney",  Country = "Australia", Latitude = -30.299108, Longitude = 153.113495, Notes = "Note 14" },
                new UserLocation { Id = Guid.NewGuid().ToString(), UserId = user4.Id, AddressLine1 = "Unit 9, 68A Princess St", AddressLine2 = "", Suburb = "Kangaroo Point",
                    Postcode = "4169", State = States.QLD.ToString(), City = "Brisbane",  Country = "Australia", Latitude = -27.482998, Longitude = 153.037888, Notes = "Note 15" },
                new UserLocation { Id = Guid.NewGuid().ToString(), UserId = user3.Id, AddressLine1 = "6 Blacket St", AddressLine2 = "", Suburb = "Downer",
                    Postcode = "2602", State = States.ACT.ToString(), City = "Canberra",  Country = "Australia", Latitude = -37.822330, Longitude = 145.058190, Notes = "Note 16" }
            };
            foreach(UserLocation location in locations)
            {
                context.UserLocations.Add(location);
            }
            context.SaveChanges();

        }
    }
}
