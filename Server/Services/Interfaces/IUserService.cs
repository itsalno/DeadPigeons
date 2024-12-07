using DataAccess.Models;
using Services.Auth.dto;

namespace Services.Interfaces;

public interface IUserService
{
     User RegisterUser(Register model);
     User GetUserByUsername(string username);

     public User? ResetPassword(Guid id, string newPass);
}