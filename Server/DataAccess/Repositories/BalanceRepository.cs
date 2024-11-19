using DataAccess.Data.Interfaces;
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
}