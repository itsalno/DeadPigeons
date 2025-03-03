﻿using DataAccess;
using DataAccess.Interfaces;
using DataAccess.Models;
using FluentValidation;
using Services.Interfaces;
using Services.TransferModels.Requests;
using Services.TransferModels.Responses;

namespace Services.Services;



public class PlayerProfileService(IPlayerProfileRepository playerProfileRepository,MyDbContext context, IValidator<PlayerProfile> createPlayerProfileValidator):IPlayerProfileService 
{
    public List<PlayerDTO> GetAllActivePlayers()
    {
        var activePlayers = playerProfileRepository.GetAllActivePlayers(); 

        var playersWithDetails = activePlayers
            .Select(player => new PlayerDTO()
            {
                PlayerId = player.Id,
                Balance = player.Balance,
                UserName = player.User.Username, 
                Name = player.User.Name,
                Surname = player.User.Surname,
                Phone = player.User.Phone,
                Email = player.User.Email,
                IsActive = player.Isactive
                
            })
            .ToList();

        return playersWithDetails;
    }
    
    public List<PlayerDTO> GetAllInactivePlayers()
    {
        var inactivePlayers = playerProfileRepository.GetAllInactivePlayers(); 

        var playersWithDetails = inactivePlayers
            .Select(player => new PlayerDTO()
            {
                PlayerId = player.Id,
                Balance = player.Balance,
                UserName = player.User.Username, 
                Name = player.User.Name,
                Surname = player.User.Surname,
                Phone = player.User.Phone,
                Email = player.User.Email,
                IsActive = player.Isactive
                
            })
            .ToList();

        return playersWithDetails;
    }
    
    public PlayerProfile? SoftDeleteProfile(Guid id)
    {
        var playerProfile = playerProfileRepository.GetById(id);
        if (playerProfile == null) return null;

        playerProfile.Isactive = false;
        playerProfileRepository.UpdatePlayerProfile(playerProfile);
        return playerProfile;
    }
    
    public PlayerProfile? MakeProfileActive(Guid id)
    {
        var playerProfile = playerProfileRepository.GetById(id);
        if (playerProfile == null) return null;

        playerProfile.Isactive = true;
        playerProfileRepository.UpdatePlayerProfile(playerProfile);
        return playerProfile;
    }
    
    public PlayerProfile GetProfileById(Guid id)
    {
        return playerProfileRepository.GetById(id);
    }

    public void UpdatePlayerBalance(UpdatePlayerDTO updatePlayerDto)
    {
        
        var playerProfile = playerProfileRepository.GetById(updatePlayerDto.PlayerId);

        if (playerProfile == null)
        {
            throw new Exception("Player not found");
        }
        
        playerProfile.Balance += updatePlayerDto.Balance;
        
        playerProfileRepository.UpdatePlayerProfile(playerProfile);
    }

    public PlayerProfile CreatePlayerProfile(Guid userId, CreatePlayerDTO createPlayerDto)
    {
        var playerProfile = new PlayerProfile
        {
            Userid = userId,
            Balance = createPlayerDto.InitialBalance,
            Isactive = createPlayerDto.IsActive,
            CreatedAt = DateTime.Now
        };
        
        createPlayerProfileValidator.ValidateAndThrow(playerProfile);

        return playerProfileRepository.CreatePlayerProfile(playerProfile);
    }
    
    
    
}