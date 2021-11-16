using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain;

namespace Persistence
{
    public class Seed
    {
        public static async Task SeedData(DataContext context)
        {
            if (context.Activities.Any()) return;

            var activities = new List<Activity>
            {
                new Activity
                {
                    Title = "Music Event 1",
                    Date = DateTime.Now.AddMonths(-2),
                    Description = "Activity 2 months ago",
                    Category = "classical",
                    Location = "Outside",
                    Venue = "Devrim",
                },
                new Activity
                {
                    Title = "Music Event 2",
                    Date = DateTime.Now.AddMonths(-1),
                    Description = "Activity 1 month ago",
                    Category = "general",
                    Location = "Outside",
                    Venue = "Devrim",
                },
                new Activity
                {
                    Title = "Upcoming Rehearsal 1",
                    Date = DateTime.Now.AddMonths(1),
                    Description = "Activity 1 month in future",
                    Category = "rehearsal",
                    Location = "Outside",
                    Venue = "Fizik çimleri",
                },
                new Activity
                {
                    Title = "Upcoming Rehearsal 2",
                    Date = DateTime.Now.AddMonths(2),
                    Description = "Activity 2 months in future",
                    Category = "general",
                    Location = "Outside",
                    Venue = "KKM otopark",
                },
                new Activity
                {
                    Title = "Acoustic Session 1",
                    Date = DateTime.Now.AddMonths(3),
                    Description = "Activity 3 months in future",
                    Category = "acoustic",
                    Location = "Outside",
                    Venue = "MM Kantin",
                },
                new Activity
                {
                    Title = "Acoustic Session 2",
                    Date = DateTime.Now.AddMonths(4),
                    Description = "Activity 4 months in future",
                    Category = "acoustic",
                    Location = "Outside",
                    Venue = "Teknokent",
                },
                new Activity
                {
                    Title = "Guitar Study Together 1",
                    Date = DateTime.Now.AddMonths(5),
                    Description = "Activity 5 months in future",
                    Category = "practice",
                    Location = "Building",
                    Venue = "Kimya",
                },
                new Activity
                {
                    Title = "Guitar Practice with Beginners",
                    Date = DateTime.Now.AddMonths(6),
                    Description = "Activity 6 months in future",
                    Category = "practice",
                    Location = "Building",
                    Venue = "Beyaz Amfi",
                },
                new Activity
                {
                    Title = "Rehearsal for Concert",
                    Date = DateTime.Now.AddMonths(7),
                    Description = "Activity 2 months ago",
                    Category = "travel",
                    Location = "Building",
                    Venue = "Guzel Sanatlar",
                },
                new Activity
                {
                    Title = "Classical Guitar Duet Practice",
                    Date = DateTime.Now.AddMonths(8),
                    Description = "Activity 8 months in future",
                    Category = "Performance",
                    Location = "Building",
                    Venue = "Bilgisayar",
                }
            };

            await context.Activities.AddRangeAsync(activities);
            await context.SaveChangesAsync();
        }
    }
}
