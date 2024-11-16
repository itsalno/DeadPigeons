using DataAccess.Models;

namespace DataAccess.Data.Interfaces;

public interface IUserRepository
{
    public List<PlayerProfile> GetAllUsers();
}