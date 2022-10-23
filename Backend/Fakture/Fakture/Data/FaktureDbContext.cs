using Fakture.Models;
using Microsoft.EntityFrameworkCore;

namespace Fakture.Data
{
    public class FaktureDbContext : DbContext
    {
        public FaktureDbContext(DbContextOptions options) : base(options)
        {
        }

        public DbSet<Faktura> Fakture { get; set; }
        public DbSet<Artikal> Artikal { get; set; }
        public DbSet<User> User { get; set; }

    }
}
