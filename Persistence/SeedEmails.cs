using System;
using System.Collections.Generic;
using System.Linq;
using Domain;

namespace Persistence
{
    public class SeedEmails
    {
        public static void SeedEmailData(DataContext context)
        {
            if (!context.Emails.Any())
            {
                var emails = new List<Email>{
                    new Email{
                        Title = "Need Help",
                        Description = "i need help...",
                        Category = "Payments",
                        UserEmail = "Ermal@gmail.com",
                        Status = "pending",
                        DateCreated = DateTime.Now,
                        Extra1 = "empty",
                    },
                    new Email{
                        Title = "Login Failed",
                        Description = "i need help with login",
                        Category = "Login & Register",
                        UserEmail = "Blinor@gmail.com",
                        Status = "pending",
                        DateCreated = DateTime.Now,
                        Extra1 = "empty",
                    },
                    new Email{
                        Title = "Need Help with my post",
                        Description = "i need help posting",
                        Category = "Posting",
                        UserEmail = "Jona@gmail.com",
                        Status = "pending",
                        DateCreated = DateTime.Now,
                        Extra1 = "empty",
                    }
                };

                context.Emails.AddRange(emails);
                context.SaveChanges();
            }
        }
    }
}