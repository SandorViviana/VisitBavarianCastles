using Microsoft.AspNetCore.Components;
using Microsoft.AspNetCore.Mvc;
using VisitBavarianCastlesAPI.Models;
using VisitBavarianCastlesAPI.Services;
using RouteAttribute = Microsoft.AspNetCore.Mvc.RouteAttribute;

namespace VisitBavarianCastlesAPI.Controllers
{

    [ApiController]
    [Route("[controller]")]
    public class VisitRecordController:ControllerBase
    {

        VisitRecordService userService = new VisitRecordService();

        /// <summary>
        /// Get all the records of a user
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public async Task<IActionResult> GetAllRecordsOfUser(string username)
        {
            List<VisitRecord> records = await userService.GetAllRecordsOfUser(username);
            return Ok(records);
        }

        /// <summary>
        /// Create a new record for a user
        /// </summary>
        /// <param name="model">The visit record object to create</param>
        /// <returns>The created record object if successful, or BadRequest if the record creation failed</returns>
        [HttpPost("{username}")]
        public async Task<IActionResult> AddRecord(string username,[FromBody] VisitRecord model)
        {
            bool success = await userService.AddVisitRecord(username, model);

            if (success)
            {
                return Ok(model);
            }
            else
            {
                return BadRequest();
            }
        }


        [HttpDelete("{id}")]
        public async  Task<IActionResult> DeleteRecord(int id)
        {
            bool success = await userService.DeleteRecord(id);

            if (success)
            {
                return Ok(id);
            }
            else
            {
                return BadRequest();
            }

        }

        [HttpPut("{id}")]
        public async Task<IActionResult> EditRecord(int id,[FromBody]VisitRecord model)
        {
            bool success = await userService.EditVisitRecord(id, model);

            if (success)
            {
                return Ok(id);
            }
            else
            {
                return BadRequest();
            }
        }   

    }




}

