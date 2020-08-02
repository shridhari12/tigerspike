using Microsoft.EntityFrameworkCore.Migrations;

namespace TigerspikeDatabase.Migrations
{
    public partial class AddedCurrentLocation : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "isCurrent",
                table: "UserLocations",
                nullable: false,
                defaultValue: false);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "isCurrent",
                table: "UserLocations");
        }
    }
}
