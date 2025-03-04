﻿using DataAccess.Data.Interfaces;
using DataAccess.Models;

namespace DataAccess.Repositories;

public class BalanceRepository(MyDbContext context) : IBalanceRepository
{
    public Transaction addFunds(Transaction transaction)
    {
        context.Transactions.Add(transaction);
        context.SaveChanges();
        return transaction;
        
    }

    public List<Transaction> GetTransactionsByPlayerId(Guid playerId)
    {
        return context.Transactions
            .Where(t => t.Playerid == playerId)
            //.OrderByDescending(t => t.TimeStamp) 
            .ToList();
    }

    public Transaction? GetById(Guid id)
    {
        return context.Transactions.FirstOrDefault(t => t.Id == id);
    }

    public void UpdateTransaction(Transaction transaction)
    {
        context.Transactions.Update(transaction);
        context.SaveChanges();
    }
    
    public void RejectTransaction(Transaction transaction)
    {
        context.Transactions.Remove(transaction);
        context.SaveChanges();
    }
}