using DataAccess;
using DataAccess.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Services;
using Services.Auth.dto;
using Services.Security;
using Services.Services;

namespace Api.Controllers
{
    [ApiController]
    [Route("api/auth")]
    public class AuthController : ControllerBase
    {
        
        
        private readonly UserService _userService;
        private readonly JWTGenerator _jwtGenerator;  

        public AuthController(UserService userService, JWTGenerator jwtGenerator)
        {
            _userService = userService;
            _jwtGenerator = jwtGenerator; 
        }

        [HttpPost("register")]
        public IActionResult Register([FromBody] Register model)
        {
            var user = _userService.RegisterUser(model);

            if (user == null)
            {
                return BadRequest(new { Message = "Registration failed" });
            }

            return Ok(new { Message = "Registration successful" });
        }

        [HttpPost("login")]
        public IActionResult Login([FromBody] LogIn model)
        {
            var user = _userService.GetUserByUsername(model.Username);

            if (user == null || !PasswordHasher.VerifyPassword(model.Password, user.PasswordHash))
            {
                return Unauthorized(new { Message = "Invalid credentials" });
            }
            
            var token = _jwtGenerator.GenerateJwtToken(user);
            return Ok(new { Token = token });
        }

       
    }
}
