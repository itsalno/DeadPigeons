using DataAccess.Data.Interfaces;
using DataAccess.Models;

namespace DataAccess.Data.Repositories;

public class UserRepository(MyDbContext context) : IUserRepository
{
    public List<PlayerProfile> GetAllUsers()
    {
        return context.PlayerProfiles.ToList();
    }
}