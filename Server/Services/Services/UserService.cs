using DataAccess.Interfaces;
using DataAccess.Models;
using Services.Auth.dto;
using Services.Interfaces;
using Services.TransferModels.Requests;

namespace Services.Services;

public class UserService(IUserRepository userRepository,IPlayerProfileService playerProfileService):IUserService
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
            Role = "User",
            FirstPass = model.FirstPass
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
    
    public User? ResetPassword(Guid id, string newPass)
    {
        var user = userRepository.GetById(id);
        if (user == null) return null;

        user.FirstPass = false;
        var hashedPassword = PasswordHasher.HashPassword(newPass);
        user.PasswordHash = hashedPassword;
        userRepository.UpdateUser(user);
        return user;
    }
    
    
    
}