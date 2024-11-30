using System;
using System.Collections.Generic;
using DataAccess.Models;
using Microsoft.EntityFrameworkCore;

namespace DataAccess;

public partial class MyDbContext : DbContext
{

    public MyDbContext(DbContextOptions<MyDbContext> options)
        : base(options)
    {
    }

    public virtual DbSet<Board> Boards { get; set; }

    public virtual DbSet<Game> Games { get; set; }

    public virtual DbSet<PlayerProfile> PlayerProfiles { get; set; }

    public virtual DbSet<Transaction> Transactions { get; set; }

    public virtual DbSet<User> User { get; set; }

    public virtual DbSet<Winner> Winners { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.HasPostgresExtension("uuid-ossp");

        modelBuilder.Entity<Board>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("boards_pk");

            entity.Property(e => e.Id)
                .HasDefaultValueSql("uuid_generate_v4()")
                .HasColumnName("id");
            entity.Property(e => e.CreatedAt)
                .HasColumnType("timestamp without time zone")
                .HasColumnName("created_at");
            entity.Property(e => e.Gameid).HasColumnName("gameid");
            entity.Property(e => e.Isautoplay).HasColumnName("isautoplay");
            entity.Property(e => e.Playerid).HasColumnName("playerid");
            entity.Property(e => e.Price).HasColumnName("price");
            entity.Property(e => e.Sequence)
                .HasColumnType("character varying")
                .HasColumnName("sequence");

            entity.HasOne(d => d.Game).WithMany(p => p.Boards)
                .HasForeignKey(d => d.Gameid)
                .HasConstraintName("boards_games_id_fk");

            entity.HasOne(d => d.Player).WithMany(p => p.Boards)
                .HasForeignKey(d => d.Playerid)
                .HasConstraintName("boards_playerprofile_id_fk");
        });

        modelBuilder.Entity<Game>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("games_pk");

            entity.Property(e => e.Id)
                .HasDefaultValueSql("uuid_generate_v4()")
                .HasColumnName("id");
            entity.Property(e => e.Carryover).HasColumnName("carryover");
            entity.Property(e => e.CreatedAt)
                .HasColumnType("timestamp without time zone")
                .HasColumnName("created_at");
            entity.Property(e => e.EndingDate).HasColumnName("ending_date");
            entity.Property(e => e.Isactive).HasColumnName("isactive");
            entity.Property(e => e.Prizepool).HasColumnName("prizepool");
            entity.Property(e => e.StartingDate).HasColumnName("starting_date");
            entity.Property(e => e.UpdatedAt)
                .HasColumnType("timestamp without time zone")
                .HasColumnName("updated_at");
            entity.Property(e => e.Week).HasColumnName("week");
            entity.Property(e => e.Winningseq)
                .HasColumnType("character varying")
                .HasColumnName("winningseq");
            entity.Property(e => e.Year).HasColumnName("year");
        });

        modelBuilder.Entity<PlayerProfile>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("playerprofile_pk");

            entity.ToTable("PlayerProfile");

            entity.Property(e => e.Id)
                .HasDefaultValueSql("uuid_generate_v4()")
                .HasColumnName("id");
            entity.Property(e => e.Balance).HasColumnName("balance");
            entity.Property(e => e.CreatedAt).HasColumnName("created_at");
            entity.Property(e => e.Isactive).HasColumnName("isactive");
            entity.Property(e => e.Userid).HasColumnName("userid");

            entity.HasOne(d => d.User).WithMany(p => p.PlayerProfiles)
                .HasForeignKey(d => d.Userid)
                .HasConstraintName("playerprofile_user_id_fk");
        });

        modelBuilder.Entity<Transaction>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("transactions_pk");

            entity.Property(e => e.Id)
                .HasDefaultValueSql("uuid_generate_v4()")
                .HasColumnName("id");
            entity.Property(e => e.Amount).HasColumnName("amount");
            entity.Property(e => e.Pending).HasColumnName("pending");
            entity.Property(e => e.CreatedAt).HasColumnName("created_at");
            entity.Property(e => e.Playerid).HasColumnName("playerid");
            entity.Property(e => e.Transactionref)
                .HasColumnType("character varying")
                .HasColumnName("transactionref");
            entity.Property(e => e.Transactiontype)
                .HasColumnType("character varying")
                .HasColumnName("transactiontype");

            entity.HasOne(d => d.Player).WithMany(p => p.Transactions)
                .HasForeignKey(d => d.Playerid)
                .HasConstraintName("transactions_playerprofile_id_fk");
        });

        modelBuilder.Entity<User>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("user_pk");

            entity.ToTable("User");

            entity.Property(e => e.Id).HasDefaultValueSql("uuid_generate_v4()");
            entity.Property(e => e.Email).HasColumnType("character varying");
            entity.Property(e => e.Name).HasColumnType("character varying");
            entity.Property(e => e.PasswordHash).HasColumnType("character varying");
            entity.Property(e => e.Phone).HasColumnType("character varying");
            entity.Property(e => e.Role).HasColumnType("character varying");
            entity.Property(e => e.Surname).HasColumnType("character varying");
            entity.Property(e => e.Username).HasColumnType("character varying");
        });

        modelBuilder.Entity<Winner>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("winners_pk");

            entity.Property(e => e.Id)
                .HasDefaultValueSql("uuid_generate_v4()")
                .HasColumnName("id");
            entity.Property(e => e.CreatedAt).HasColumnName("created_at");
            entity.Property(e => e.AmountWon).HasColumnName("amountwon");
            entity.Property(e => e.Gameid).HasColumnName("gameid");
            entity.Property(e => e.Playerid).HasColumnName("playerid");
            entity.Property(e => e.Sequence)
                .HasColumnType("character varying")
                .HasColumnName("sequence");

            entity.HasOne(d => d.Game).WithMany(p => p.Winners)
                .HasForeignKey(d => d.Gameid)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("winners_games_id_fk");

            entity.HasOne(d => d.Player).WithMany(p => p.Winners)
                .HasForeignKey(d => d.Playerid)
                .HasConstraintName("winners_playerprofile_id_fk");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
