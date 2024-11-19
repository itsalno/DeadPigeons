using DataAccess.Interfaces;
using DataAccess.Models;
using Microsoft.EntityFrameworkCore;

namespace DataAccess.Repositories;

public class PlayerProfileRepository(MyDbContext context) : IPlayerProfileRepository
{
    public List<PlayerProfile> GetAllPlayers()
    {
        return context.PlayerProfiles
            .Where(player => player.Isactive == true) 
            .Include(player=> player.User)
            .ToList();
    }

    public PlayerProfile? GetById(Guid id)
    {
            return context.PlayerProfiles.FirstOrDefault(p => p.Id == id);
    }
    
    public void UpdatePlayerProfile(PlayerProfile profile)
    {
        context.PlayerProfiles.Update(profile);
        context.SaveChanges();
    }

    public PlayerProfile CreatePlayerProfile(PlayerProfile profile)
    {
        context.PlayerProfiles.Add(profile);
        context.SaveChanges();
        return profile;
    }
}