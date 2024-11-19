using DataAccess.Models;

namespace DataAccess.Data.Interfaces;

public interface IBalanceRepository
{
    public Transaction addFunds(Transaction transaction);
}