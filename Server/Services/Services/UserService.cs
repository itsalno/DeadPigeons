using DataAccess.Interfaces;
using DataAccess.Models;
using Services.Auth.dto;
using Services.TransferModels.Requests;

namespace Services.Services;

public class UserService(IUserRepository userRepository,PlayerProfileService playerProfileService)
{
    
    
    public User RegisterUser(Register model)
    {
        
        var hashedPassword = PasswordHasher.HashPassword(model.Password);
        var user = new User
        {
            Username = model.Username,
            Email = model.Email,
            Name = model.Name,
            Surname = model.Surname,
            Phone = model.Phone,
            PasswordHash = hashedPassword,
            Role = "User"
        };

        var createdUser = userRepository.CreateUser(user);
        
        var playerProfileDto = new CreatePlayerDTO
        {
            InitialBalance = 0, 
            IsActive = true       
        };
        
        playerProfileService.CreatePlayerProfile(createdUser.Id, playerProfileDto);

        return createdUser;
    }
    
    public User GetUserByUsername(string username)
    {
        return userRepository.GetUserByUsername(username);
    }
    
    
    
}