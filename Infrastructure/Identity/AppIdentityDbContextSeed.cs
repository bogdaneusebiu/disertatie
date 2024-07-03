using Core.Entities.Identity;
using Microsoft.AspNetCore.Identity;

namespace Infrastructure.Identity
{
    public class AppIdentityDbContextSeed
    {
        public static async Task SeedUserAsync(UserManager<AppUser> userManager)
        {
            if (!userManager.Users.Any())
            {
                var user = new AppUser
                {
                    DisplayName = "Bob",
                    Email = "admin@test.com",
                    UserName = "admin@test.com",
                    Address = new Address
                    {
                        FirstName =  "Bob",
                        LastName = "Cuntman",
                        Street = "Principatele unite nr 71",
                        City = "Bucuresti",
                        Judet = "Ilfov",
                        ZipCode = "800802"
                    }
                };

                await userManager.CreateAsync(user, "Pa$$w0rd");
            }
        }
    }
}