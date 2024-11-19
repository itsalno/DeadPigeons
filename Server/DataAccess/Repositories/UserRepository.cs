using DataAccess.Interfaces;
using DataAccess.Models;

namespace DataAccess.Repositories;

public class UserRepository(MyDbContext context):IUserRepository
{
    
    
    public User CreateUser(User user)
    {
        context.User.Add(user);
        context.SaveChanges();
        return user;
    }
    

    public User GetUserByUsername(string username)
    {
        return context.User.SingleOrDefault(u => u.Username == username);
    }
}