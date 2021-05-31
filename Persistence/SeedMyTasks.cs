using System;
using System.Collections.Generic;
using System.Linq;
using Domain;

namespace Persistence
{
    public class SeedMyTasks
    {
        public static void SeedMyTaskData(DataContext context)
        {
            if (!context.MyTasks.Any())
            {
                var myTasks = new List<MyTask>{
                    new MyTask{
                        Title = "Banner for Posts",
                        Description = "design a banner for a post",
                        Category = "Design",
                        Status = "in progress",
                        Priority = "medium",
                        DateCreated = DateTime.Now,
                        DeadlineDate = DateTime.Now.AddMonths(2)
                    },
                    new MyTask{
                        Title = "Create Backup",
                        Description = "Create a database Backup",
                        Category = "Backup",
                        Status = "in progress",
                        Priority = "high",
                        DateCreated = DateTime.Now,
                        DeadlineDate = DateTime.Now.AddMonths(1)
                    },
                    new MyTask{
                        Title = "Export Users list",
                        Description = "export a pdf of users list",
                        Category = "Export",
                        Status = "completed",
                        Priority = "low",
                        DateCreated = DateTime.Now,
                        DeadlineDate = DateTime.Now.AddMonths(1)
                    },

                };

                context.MyTasks.AddRange(myTasks);
                context.SaveChanges();
            }
        }
    }
}