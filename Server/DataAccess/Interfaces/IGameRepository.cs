﻿using DataAccess.Models;


namespace DataAccess.Data.Interfaces;

public interface IGameRepository
{
    public Game CreateGame(Game game);

    public Game? GetActiveGame();
    public List<Game> GetAllGames();

    public Game? GetById(Guid id);

    public void EndGame(Game game);
    public void UpdateGame(Game game);

    public int? GetPricePoolByGameId(Guid gameId);
    
    public Game GetLastGame();




}