using DataAccess.Interfaces;
using DataAccess.Models;

namespace DataAccess.Repositories;

public class BoardRepository(MyDbContext context) : IBoardRepository
{
    public Board CreateBoard(Board board)
    {
        context.Boards.Add(board);
        context.SaveChanges();
        return board;
    }
}