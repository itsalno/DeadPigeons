using DataAccess.Models;

namespace DataAccess.Interfaces;

public interface IBoardRepository
{
    public Board CreateBoard(Board board);

    public List<Board> GetAutoplayBoard();

    public Board UpdateBoard(Board board);

}