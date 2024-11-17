using DataAccess.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Services;
using Services.Auth.dto;
using Services.Security;

namespace Api.Controllers
{
    [ApiController]
    [Route("api/auth")]
    public class AuthController : ControllerBase
    {
        
        
        private readonly MyDbContext _dbContext;
        private readonly JWTGenerator _jwtGenerator;  

        public AuthController(MyDbContext dbContext, JWTGenerator jwtGenerator)
        {
            _dbContext = dbContext;
            _jwtGenerator = jwtGenerator; 
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] Register model)
        {
            var hashedPassword = PasswordHasher.HashPassword(model.Password);
            var user = new User { Username = model.Username, Email = model.Email, PasswordHash = hashedPassword, Role = "User" };

            _dbContext.User.Add(user);
            await _dbContext.SaveChangesAsync();

            return Ok(new { Message = "Registration successful" });
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LogIn model)
        {
            var user = await _dbContext.User.SingleOrDefaultAsync(u => u.Username == model.Username);

            if (user == null || !PasswordHasher.VerifyPassword(model.Password, user.PasswordHash))
            {
                return Unauthorized(new { Message = "Invalid credentials" });
            }
            
            var token = _jwtGenerator.GenerateJwtToken(user);
            return Ok(new { Token = token });
        }

       
    }
}
