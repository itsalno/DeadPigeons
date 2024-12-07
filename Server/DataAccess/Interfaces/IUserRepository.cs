using DataAccess.Models;

namespace DataAccess.Interfaces;

public interface IUserRepository
{
    User CreateUser(User user);
    User GetUserByUsername(string username);

    public User GetById(Guid id);

    public void UpdateUser(User user);
}