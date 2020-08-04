using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Security.Cryptography;
using System.Security.Cryptography.Xml;
using TigerspikeCodeChallenge.Models;
using TigerspikeDatabase.Data;
using TigerspikeDatabase.Models;

namespace TigerspikeCodeChallenge.Repositories
{
    public class TigerspikeRepository : ITigerspikeRepository
    {
        public readonly TigerspikeDbContext _context;
        public TigerspikeRepository(TigerspikeDbContext context)
        {
            _context = context;
        }

        public List<UserInfo> GetAllUsers()
        {
            return _context.Users.ToList();
        }

        public List<UserLocation> GetUserLocations(string userId)
        {
            return _context.UserLocations.Where(ul => ul.UserId == userId && ul.isCurrent == false).ToList();
        }

        public UserLocation SaveNotesForUserLocation(string userId, string locationId, string notes)
        {
            var userLocation = _context.UserLocations.FirstOrDefault(
                                    ul => ul.UserId == userId
                                    && ul.Id == locationId);
            if (userLocation == null)
            {
                throw new KeyNotFoundException("No record found");
            }
            userLocation.Notes = notes;
            _context.UserLocations.Update(userLocation);
            _context.SaveChanges();
            return userLocation;
        }

        public UserLocation GetCurrentLocationForUser(string userId)
        {
            var userLocation = _context.UserLocations.FirstOrDefault(
                                ul => ul.UserId == userId
                                && ul.isCurrent == true);
            return userLocation;
        }

        public UserLocation SaveLocationForUser(string userId, string locationId, string addressLine1,
            string addressLine2, string postcode, string suburb, string state, string city, string country,
            double latitude, double longitude, bool isCurrent, string notes)
        {
            UserLocation userLocationToBeAdded = null;
            var user = _context.Users.FirstOrDefault(ul => ul.Id == userId);
            if (user == null)
            {
                throw new KeyNotFoundException("User not found");
            }

            var userCurrentLocation = _context.UserLocations.FirstOrDefault(ul => ul.UserId == userId
                                && ul.isCurrent == true);
            if (userCurrentLocation != null) // Update User Location record
            {
                _context.UserLocations.Remove(userCurrentLocation);
            }

            if (!string.IsNullOrEmpty(locationId))
            {
                var userLocation = _context.UserLocations.FirstOrDefault(ul => ul.UserId == userId
                                    && ul.Id == locationId);
                if (userLocation == null)
                {
                    throw new KeyNotFoundException("User Location not found");
                }
                // Update Notes for existing UserLocation record
                userLocation.Notes = notes;
                _context.UserLocations.Update(userLocation);
                _context.SaveChanges();
                return userLocation;
            }
            else
            {
                // Add User Location Record
                var locationIdToBeAdded = Guid.NewGuid().ToString().ToLower();
                userLocationToBeAdded = new UserLocation
                {
                    UserId = userId,
                    Id = locationIdToBeAdded,
                    AddressLine1 = addressLine1,
                    AddressLine2 = addressLine2,
                    Suburb = suburb,
                    State = state,
                    City = city,
                    Country = country,
                    Postcode = postcode,
                    Latitude = latitude,
                    Longitude = longitude,
                    isCurrent = isCurrent,
                    Notes = notes
                };
                _context.UserLocations.Add(userLocationToBeAdded);
                _context.SaveChanges();
                return userLocationToBeAdded;
            }

        }

        public void DeleteUserLocation(string userId, string locationId)
        {
            if (string.IsNullOrEmpty(userId))
            {
                throw new ArgumentNullException("UserId cannot be null");
            }
            if (string.IsNullOrEmpty(locationId))
            {
                throw new ArgumentNullException("UserId cannot be null");
            }
            var userLocation = _context.UserLocations.FirstOrDefault(ul => ul.UserId == userId
                                 && ul.Id == locationId);
            if (userLocation == null)
            {
                throw new KeyNotFoundException("Unable to find the user location record to be deleted");
            }
            _context.UserLocations.Remove(userLocation);
            _context.SaveChanges();
        }

        public IReadOnlyList<SearchUserLocationNotesResult> SearchUserLocationNotes(string userId, string searchNoteText)
        {
            var searchNoteParam = searchNoteText.Trim();
            IReadOnlyList<SearchUserLocationNotesResult> userLocationNotes = _context.UserLocations.Include(ul => ul.UserInfo).ToList()
                                                         .GroupBy(g => g.UserInfo)
                                                         .Select(r => new SearchUserLocationNotesResult { 
                                                             UserInfo = r.Key, 
                                                             MatchingLocations = r.Where(b => b.Notes.Contains(searchNoteParam)).ToList() 
                                                         })
                                                         .Where(u =>
                                                            ((!string.IsNullOrEmpty(userId) && u.UserInfo.Id == userId)
                                                             || (string.IsNullOrEmpty(userId) && u.UserInfo.Id != userId))
                                                             && (u.MatchingLocations.Any(l => l.Notes.Contains(searchNoteParam)))
                                                             ).ToList();
            //IReadOnlyList <SearchUserLocationNotesResult> userLocationNotes = 
            //                                                 (from u in _context.Users.Include(u => u.Locations)
            //                                                 from ul in _context.UserLocations 
            //                                                 where (u.Id == ul.UserId)
            //                                                 select new SearchUserLocationNotesResult 
            //                                                 { 
            //                                                     UserInfo = u, 
            //                                                     MatchingLocations = ul 
            //                                                 })
            //                                                 .Where(r => 
            //                                                 ((!string.IsNullOrEmpty(userId) && r.UserInfo.Id == userId)
            //                                                 || (string.IsNullOrEmpty(userId) && r.UserInfo.Id != userId))
            //                                                 // && (r.MatchingLocations.Any(mr => mr.Notes.Contains(searchNoteParam)))
            //                                                 )
            //                                                 .ToList();
            //IReadOnlyList<UserInfo> userLocationNotes = _context.Users.Include(u => u.Locations)
            //                                                 .Where(u => ((!string.IsNullOrEmpty(userId) && u.Id == userId)
            //                                                 || (string.IsNullOrEmpty(userId) && u.Id != userId))
            //                                                 && u.Locations.Any(ul => ul.Notes.Contains(searchNoteParam))
            //                                                 )
            //                                                 .ToList();
            return userLocationNotes;
        }

    }
}
