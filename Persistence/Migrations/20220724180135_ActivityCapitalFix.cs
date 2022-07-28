using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Persistence.Migrations
{
    public partial class ActivityCapitalFix : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "isHostOfTheEvent",
                table: "ActivityAttendees",
                newName: "IsHostOfTheEvent");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "IsHostOfTheEvent",
                table: "ActivityAttendees",
                newName: "isHostOfTheEvent");
        }
    }
}
