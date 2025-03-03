﻿using DataAccess.Models;

namespace DataAccess.Data.Interfaces;

public interface IBalanceRepository
{
    public Transaction addFunds(Transaction transaction);
    List<Transaction> GetTransactionsByPlayerId(Guid playerId);

    public Transaction? GetById(Guid id);

    public void UpdateTransaction(Transaction transaction);

    public void RejectTransaction(Transaction transaction);

}