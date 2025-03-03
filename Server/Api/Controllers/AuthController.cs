using System.IdentityModel.Tokens.Jwt;
using DataAccess;
using DataAccess.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Services;
using Services.Auth.dto;
using Services.Interfaces;
using Services.Security;
using Services.Services;
using Services.TransferModels.Responses;

[ApiController]
    [Route("api/auth")]
    public class AuthController : ControllerBase
    {
        
        
        private readonly IUserService _userService;
        private readonly JWTGenerator _jwtGenerator;  
        private readonly MyDbContext _context;

        public AuthController(IUserService userService, JWTGenerator jwtGenerator,MyDbContext context)
        {
            _userService = userService;
            _jwtGenerator = jwtGenerator; 
            _context = context;
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
        [AllowAnonymous]
        public ActionResult<LogInResponseDTO> Login([FromBody] LogIn model)
        {
            var user = _userService.GetUserByUsername(model.Username);

            if (user == null || !PasswordHasher.VerifyPassword(model.Password, user.PasswordHash))
            {
                return Unauthorized(new { Message = "Invalid credentials" });
            }
            
            
            var token = _jwtGenerator.GenerateJwtToken(user);
            Console.WriteLine($"Logged in user: {user.Username}, UserId: {user.Id}");
            
            
            var playerProfile = _context.PlayerProfiles
                .FirstOrDefault(p => p.Userid == user.Id);

            
            if (playerProfile != null)
            {
                Console.WriteLine($"PlayerProfile found: {playerProfile.Id}, Balance: {playerProfile.Balance}, IsActive: {playerProfile.Isactive}");
            }
            else
            {
                Console.WriteLine("PlayerProfile not found or doesn't match the user.");
            }
            
            if (playerProfile == null)
            {
                return Unauthorized(new { Message = "Player profile not found" });
            }
            
            var loginResponse = new LogInResponseDTO
            {
                Token = token,
                PlayerProfileId = playerProfile.Id.ToString(),
                FirstPass = user.FirstPass,
                UserId = user.Id
            };
            
            return Ok(loginResponse);
        }
        
        [HttpPatch]
        [Route("{id}/resetPass")]
        
        public ActionResult<User> ResetPass(Guid id, string newPass)
        {
            var user = _userService.ResetPassword(id, newPass);

            if (user == null)
            {
                return NotFound(new { message = "Profile not found" });
            }

            return Ok(user);
        }

        
    }
