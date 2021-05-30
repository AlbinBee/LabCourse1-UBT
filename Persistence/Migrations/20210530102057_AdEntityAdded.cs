using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Persistence.Migrations
{
    public partial class AdEntityAdded : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Ads",
                columns: table => new
                {
                    Id = table.Column<Guid>(nullable: false),
                    Title = table.Column<string>(nullable: true),
                    Type = table.Column<string>(nullable: true),
                    Price = table.Column<double>(nullable: false),
                    isBanner = table.Column<bool>(nullable: false),
                    isSlideshow = table.Column<bool>(nullable: false),
                    MainImage = table.Column<string>(nullable: true),
                    BannerImage = table.Column<string>(nullable: true),
                    SlideshowImage = table.Column<string>(nullable: true),
                    dateCreated = table.Column<DateTime>(nullable: false),
                    expirationDate = table.Column<DateTime>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Ads", x => x.Id);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Ads");
        }
    }
}
