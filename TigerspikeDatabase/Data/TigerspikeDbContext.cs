using Microsoft.EntityFrameworkCore;
using TigerspikeDatabase.Models;

namespace TigerspikeDatabase.Data
{
    public class TigerspikeDbContext : DbContext
    {
        public TigerspikeDbContext(DbContextOptions<TigerspikeDbContext> options): base(options)
        {
        }

        public DbSet<UserInfo> Users { get; set; }
        public DbSet<UserLocation> UserLocations { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<UserInfo>().ToTable("Users");
            modelBuilder.Entity<UserInfo>(entity =>
            {
                entity.HasIndex(e => e.Id).IsUnique();
            });
            modelBuilder.Entity<UserLocation>().ToTable("UserLocations");
            modelBuilder.Entity<UserLocation>()
                .HasKey(e => new { e.Id, e.UserId });
        }
    }

    
}
