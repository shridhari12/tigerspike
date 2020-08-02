using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;
using Microsoft.Extensions.Configuration;
using System.IO;
using TigerspikeDatabase.Data;

namespace TigerspikeCodeChallenge
{
    public class DesignTimeDbContextFactory : IDesignTimeDbContextFactory<TigerspikeDbContext>
    {
        public TigerspikeDbContext CreateDbContext(string[] args)
        {
            IConfigurationRoot configuration = new ConfigurationBuilder()
                .SetBasePath(Directory.GetCurrentDirectory())
                .AddJsonFile("appsettings.json")
                .Build();

            var builder = new DbContextOptionsBuilder<TigerspikeDbContext>();

            var connectionString = configuration.GetConnectionString("DefaultConnection");

            builder.UseSqlServer(connectionString);

            return new TigerspikeDbContext(builder.Options);
        }
    }
}
