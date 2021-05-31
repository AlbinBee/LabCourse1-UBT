﻿using Domain;
using Microsoft.EntityFrameworkCore;

namespace Persistence
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions options) : base(options)
        {
        }
        public DbSet<Value> Values { get; set; }
        public DbSet<Activity> Activities { get; set; }
        public DbSet<Event> Events { get; set; }
        public DbSet<User> Users { get; set; }
        public DbSet<Ad> Ads { get; set; }
        public DbSet<Email> Emails { get; set; }
        
        protected override void OnModelCreating(ModelBuilder builder){
            builder.Entity<Value>().HasData(
                new Value {Id = 1, Name = "Value 101"},
                new Value {Id = 2, Name = "Value 102"},
                new Value {Id = 3, Name = "Value 103"}
            );
        }
    }
}
