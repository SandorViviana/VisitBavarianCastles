using Microsoft.AspNetCore.Mvc;
using System.Reflection.Metadata;
using System;
using VisitBavarianCastlesAPI.Models;
using VisitBavarianCastlesAPI.Services;

namespace VisitBavarianCastlesAPI.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class UserController : ControllerBase
    {
        UserService userService = new UserService();

        /// <summary>
        /// Get all users
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public async Task<IActionResult> GetAllUsers()
        {
            List<User> users = await userService.GetAllUsers();
            return Ok(users);
        }

        /// <summary>
        /// Get a user by ID
        /// </summary>
        /// <param name="id">The ID of the user</param>
        /// <returns>The user object if found, or NotFound if not found</returns>
        [HttpGet("{id}")]
        public async Task<IActionResult> GetUserById(Guid id)
        {
            User? user = await userService.GetUserById(id);

            if (user == null)
            {
                return NotFound(); // User not found
            }
            return Ok(user);
        }

        /// <summary>
        /// Get a user by username
        /// </summary>
        /// <param name="username">The username of the user</param>
        /// <returns>The user object if found, or NotFound if not found</returns>
        [HttpGet("{username}")]
        public async Task<IActionResult> GetUserByUsername(string username)
        {
            User? user = await userService.GetUserByUsername(username);

            if (user == null)
            {
                return NotFound(); // User not found
            }
            return Ok(user);
        }

        /// <summary>
        /// Checks if a username already exists
        /// </summary>
        /// <param name="username">The username to check</param>
        /// <returns>True if the username already exists, false otherwise</returns>
        [HttpGet("/checkUsername/{username}")]
        public async Task<IActionResult> UsernameAlreadyExists(string username)
        {
            List<User> users = await userService.GetAllUsers();
            bool usernameExists = users.Exists(user => user.Username == username);

            return Ok(usernameExists);
        }

        /// <summary>
        /// Create a new user
        /// </summary>
        /// <param name="model">The user object to create</param>
        /// <returns>The created user object if successful, or BadRequest if the user creation failed</returns>
        [HttpPost]
        public async Task<IActionResult> CreateUser([FromBody] UserCreateUpdate model)
        {
            bool success = await userService.CreateUser(model);

            if (success)
            {
                return Ok(model); 
            }
            else
            {
                return BadRequest(); 
            }
        }

    }
}
