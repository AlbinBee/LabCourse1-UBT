// using System;
// using System.Collections.Generic;
// using System.Linq;
// using Domain;

// namespace Persistence
// {
//     public class SeedUsers
//     {
//         public static void SeedUserData(DataContext context)
//         {
//             if (!context.Users.Any())
//             {
//                 var users = new List<User>{
//                     new User{
//                         Username = "Ermalboti",
//                         FirstName = "Ermal",
//                         LastName = "Topalli",
//                         Password = "Ermal123",
//                         Email = "Ermal@gmail.com",
//                         Role = "admin",
//                         Age = 19,
//                         isPremium = true,
//                         DateRegistered = DateTime.Now,
//                         City = "Ferizaj",
//                         AvatarImage = "imagePath",
//                         Extra1 = "Text",
//                         Status = "active",
//                     },
//                     new User{
//                         Username = "AlbinBee",
//                         FirstName = "Albin",
//                         LastName = "Berisha",
//                         Password = "AlbinNeeeee",
//                         Email = "aberisha@gmail.com",
//                         Role = "admin",
//                         Age = 19,
//                         isPremium = true,
//                         DateRegistered = DateTime.Now,
//                         City = "Ferizaj",
//                         AvatarImage = "imagePath",
//                         Status = "inactive"
//                     },
//                     new User{
//                         Username = "kajtaziblinor",
//                         FirstName = "Blinor",
//                         LastName = "Kajtazi",
//                         Password = "Kajtazi777",
//                         Email = "blinorii@gmail.com",
//                         Role = "user",
//                         Age = 19,
//                         isPremium = true,
//                         DateRegistered = DateTime.Now,
//                         City = "Ferizaj",
//                         AvatarImage = "imagePath",
//                         Extra1 = "Text",
//                         Status = "blocked"
//                     },
//                 };

//                 context.Users.AddRange(users);
//                 context.SaveChanges();
//             }
//         }
//     }
// }