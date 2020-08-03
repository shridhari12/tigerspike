using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using TigerspikeCodeChallenge.Models;
using TigerspikeCodeChallenge.Repositories;
using TigerspikeDatabase.Models;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace TigerspikeCodeChallenge.Controllers
{
    [Route("api/tigerspike")]
    [ApiController]
    public class TigerspikeController : ControllerBase
    {
        private readonly ILogger<TigerspikeController> _logger;
        private readonly ITigerspikeRepository _repository;

        public TigerspikeController(
            ILogger<TigerspikeController> logger,
            ITigerspikeRepository repository)
        {
            _logger = logger;
            _repository = repository;
        }

        // GET: api/<TigerspikeController>
        [HttpGet]
        [Route("users")]
        public IActionResult Get()
        {
            var users = _repository.GetAllUsers();
            return Ok(users);
        }

        [HttpGet]
        [Route("getuserlocations/{userId}/")]
        public IActionResult GetUserLocations(string userId)
        {
            GetUserLocationsResponse userLocationsResponse = new GetUserLocationsResponse();
            try
            {
                var userLocations = _repository.GetUserLocations(userId);
                userLocationsResponse.IsSuccess = true;
                userLocationsResponse.Locations = userLocations;
                return Ok(userLocations);
            }
            catch (ArgumentNullException ae)
            {
                _logger.LogError("[TigerspikeController][GetUserLocations] [ArgumentNullException]");
                _logger.LogError(ae.Message);
                _logger.LogError(ae.StackTrace);
                userLocationsResponse.IsSuccess = false;
                return new BadRequestObjectResult(userLocationsResponse);
            }
            catch (KeyNotFoundException ke)
            {
                _logger.LogError("[TigerspikeController][GetUserLocations] [KeyNotFoundException]");
                _logger.LogError(ke.Message);
                _logger.LogError(ke.StackTrace);
                userLocationsResponse.IsSuccess = false;
                return new NotFoundObjectResult(userLocationsResponse);
            }
            catch (Exception ex)
            {
                _logger.LogError("[TigerspikeController][GetUserLocations] Error encountered");
                _logger.LogError(ex.Message);
                _logger.LogError(ex.StackTrace);
                userLocationsResponse.IsSuccess = false;
                return new BadRequestObjectResult(userLocationsResponse);
            }
        }

        
        [HttpGet]
        [Route("{userId}/getcurrentlocation")]
        public IActionResult GetCurrentLocationForUser(string userId)
        {
            var currentUserLocation = _repository.GetCurrentLocationForUser(userId);
            return Ok(currentUserLocation);
        }

        //[EnableCors("CorsPolicy")]
        [HttpPost]
        [Route("addnotes")]
        public IActionResult AddNotes([FromBody] UserLocationNotesAddModel model)
        {
            if (!ModelState.IsValid)
            {
                throw new ValidationException("Input is invalid");
            }
            var userId = model.UserId.Trim();
            var locationId = model.LocationId.Trim();
            var notes = model.Notes.Trim();
            var savedNote = _repository.SaveNotesForUserLocation(userId, locationId, notes);
            return Ok(savedNote);
        }

        [HttpPost]
        [Route("saveuserlocation")]
        public IActionResult SaveUserLocation([FromBody] UserLocationAddModel model)
        {
            if (!ModelState.IsValid)
            {
                throw new ValidationException("Input is invalid");
            }
            var userId = model?.UserId?.Trim();
            var locationId = model?.LocationId?.Trim();
            var addressLine1 = model?.AddressLine1?.Trim();
            var addressLine2 = model?.AddressLine2?.Trim();
            var postcode = model?.Postcode?.Trim();
            var suburb = model?.Suburb?.Trim();
            var state = model?.State?.Trim();
            var city = model?.City?.Trim();
            var country = model?.Country?.Trim();
            var latitude = model.Latitude;
            var longitude = model.Longitude;
            var isCurrent = model.IsCurrent;
            var notes = model?.Notes?.Trim();

            var savedUserLocation = _repository.SaveLocationForUser(
                userId,
                locationId,
                addressLine1,
                addressLine2,
                postcode,
                suburb,
                state,
                city,
                country,
                latitude,
                longitude,
                isCurrent,
                notes);
            return Ok(savedUserLocation);
        }

        // GET api/<TigerspikeController>/5
        [HttpGet("{id}")]
        public string Get(int id)
        {
            return "value";
        }

        // POST api/<TigerspikeController>
        [HttpPost]
        public void Post([FromBody] string value)
        {
        }

        // PUT api/<TigerspikeController>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE api/<TigerspikeController>/5
        [HttpDelete]
        [Route("deleteuserlocation/{userId}/{locationId}")]
        public IActionResult Delete(string userId, string locationId)
        {
            DeleteUserLocationResponse deleteUserLocationResponse = new DeleteUserLocationResponse(); 
            try
            {
                if (!ModelState.IsValid)
                {
                    throw new ValidationException("Invalid input provided");
                }
                _repository.DeleteUserLocation(userId, locationId);
                deleteUserLocationResponse.IsSuccess = true;
                return Ok(deleteUserLocationResponse);
            }
            catch (ArgumentNullException ae)
            {
                _logger.LogError("[TigerspikeController][DeleteUserLocation] [ArgumentNullException]");
                _logger.LogError(ae.Message);
                _logger.LogError(ae.StackTrace);
                deleteUserLocationResponse.IsSuccess = false;
                return new BadRequestObjectResult(deleteUserLocationResponse);
            }
            catch (KeyNotFoundException ke)
            {
                _logger.LogError("[TigerspikeController][DeleteUserLocation] [KeyNotFoundException]");
                _logger.LogError(ke.Message);
                _logger.LogError(ke.StackTrace);
                deleteUserLocationResponse.IsSuccess = false;
                return new NotFoundObjectResult(deleteUserLocationResponse);
            }
            catch (Exception ex)
            {
                _logger.LogError("[TigerspikeController][DeleteUserLocation] Error encountered");
                _logger.LogError(ex.Message);
                _logger.LogError(ex.StackTrace);
                return new BadRequestObjectResult(deleteUserLocationResponse);
            }
        }
    }
}
