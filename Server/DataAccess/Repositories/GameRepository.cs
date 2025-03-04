﻿using DataAccess.Data.Interfaces;
using DataAccess.Models;
using Npgsql;

namespace DataAccess.Repositories;

public class GameRepository(MyDbContext context) : IGameRepository
{
    public Game CreateGame(Game game)
    {
        context.Games.Add(game);
        context.SaveChanges();
        return game;
    }

    public Game? GetActiveGame()
    {
        var activeGame = context.Games.Where(g=> g.Isactive == true).SingleOrDefault();
        if(activeGame != null)
        {
            return activeGame;    
        }

        return null;
    }
    public List<Game> GetAllGames()
    {
        return context.Games.ToList();
    }

    public Game? GetById(Guid id)
    {
        return context.Games.FirstOrDefault(g => g.Id == id);
    }
    
    public void EndGame(Game game)
    {
        context.Games.Update(game);
        context.SaveChanges();
    }

    public void UpdateGame(Game game)
    {
        context.Games.Update(game);
        context.SaveChanges();
    }
    
    public int? GetPricePoolByGameId(Guid gameId)
    {
        var game = context.Games.FirstOrDefault(g => g.Id == gameId);

        return game?.Prizepool;
    }
    
    public Game GetLastGame()
    {
        return context.Games
            .OrderByDescending(g => g.CreatedAt)
            .FirstOrDefault();
    }
}