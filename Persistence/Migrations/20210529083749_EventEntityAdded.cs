using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Persistence.Migrations
{
    public partial class EventEntityAdded : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Events",
                columns: table => new
                {
                    Id = table.Column<Guid>(nullable: false),
                    Title = table.Column<string>(nullable: true),
                    Description = table.Column<string>(nullable: true),
                    Category = table.Column<string>(nullable: true),
                    DateCreated = table.Column<DateTime>(nullable: false),
                    DateOfEvent = table.Column<DateTime>(nullable: false),
                    City = table.Column<string>(nullable: true),
                    MainImage = table.Column<string>(nullable: true),
                    GalleryImages = table.Column<string>(nullable: true),
                    isBookable = table.Column<bool>(nullable: false),
                    hasTickets = table.Column<bool>(nullable: false),
                    AvailableTickets = table.Column<int>(nullable: false),
                    Views = table.Column<int>(nullable: false),
                    Extra1 = table.Column<string>(nullable: true),
                    Extra2 = table.Column<string>(nullable: true),
                    Extra3 = table.Column<string>(nullable: true),
                    Extra4 = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Events", x => x.Id);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Events");
        }
    }
}
