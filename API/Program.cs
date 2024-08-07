using Infrastructure.Data;
using Microsoft.EntityFrameworkCore;
using Infrastructure.Identity;
using Core.Entities.Identity;
using Microsoft.AspNetCore.Identity;



namespace API
{
    public class Program
    {
        public static async Task Main(string[] args)
        {
           var host =  CreateHostBuilder(args).Build();
           using (var scope = host.Services.CreateScope())
           {
            var services = scope.ServiceProvider;
            var loggerFactory = services.GetRequiredService<ILoggerFactory>();
            try 
            {
                var context = services.GetRequiredService<StoreContext>();
                await context.Database.MigrateAsync();
                await StoreContextSeed.SeedAsync(context, loggerFactory);

                var userManager = services.GetRequiredService<UserManager<AppUser>>();
                var roleManager = services.GetRequiredService<RoleManager<IdentityRole>>();

                var identityContext = services.GetRequiredService<AppIdentityDbContext>();
                await identityContext.Database.MigrateAsync();

                await AppIdentityDbContextSeed.SeedRolesAsync(roleManager);
                await AppIdentityDbContextSeed.SeedUserAsync(userManager);
                       
            }
            catch (Exception ex)
            {
                var logger = loggerFactory.CreateLogger<Program>();
                logger.LogError(ex, "An error occurred during migration");
            }
           }

           host.Run();
        }

        public static IHostBuilder CreateHostBuilder(string[] args) =>
            Host.CreateDefaultBuilder(args)
                .ConfigureWebHostDefaults(webBuilder =>
                {
                    webBuilder.UseStartup<Startup>();
                });
    }
}
