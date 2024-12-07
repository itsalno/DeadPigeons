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
    
    public User GetById(Guid id)
    {
        return context.User.FirstOrDefault(u => u.Id == id);
    }
    
    public void UpdateUser(User user)
    {
        context.User.Update(user);
        context.SaveChanges();
    }
}