using Core.Entities.Identity;
using Microsoft.AspNetCore.Identity;
using StackExchange.Redis;

namespace Infrastructure.Identity
{
    public class AppIdentityDbContextSeed
    {
        public static async Task SeedUserAsync(UserManager<AppUser> userManager)
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
            if (!userManager.Users.Any())
            {
                await userManager.CreateAsync(user, "Pa$$w0rd");         
            }
            var result = await userManager.AddToRoleAsync(user, "Administrator");

            if(!result.Succeeded)
            {
                Console.WriteLine(result);
            }
        }

        public static async Task SeedRolesAsync(RoleManager<IdentityRole> roleManager)
        {
            if(!roleManager.Roles.Any())
            {
                var roles = new string[] {"Administrator", "User"};
                
                foreach (string role in roles)
                {
                    await roleManager.CreateAsync (new IdentityRole(role));
                }
            }
        }
    }
}