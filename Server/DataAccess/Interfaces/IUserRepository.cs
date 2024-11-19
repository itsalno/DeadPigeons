using DataAccess.Models;

namespace DataAccess.Interfaces;

public interface IUserRepository
{
    User CreateUser(User user);
    User GetUserByUsername(string username);
}