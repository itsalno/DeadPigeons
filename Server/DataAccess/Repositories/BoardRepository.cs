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

    public List<Board> GetAutoplayBoard()
    {
        return context.Boards.Where(b => b.AutoplayEnabled == true).ToList();
    }

    public Board UpdateBoard(Board board)
    {
        context.Boards.Update(board);
        context.SaveChanges();
        return board;
    }
}