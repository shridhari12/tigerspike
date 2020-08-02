using Microsoft.EntityFrameworkCore.Migrations;

namespace TigerspikeDatabase.Migrations
{
    public partial class AddedColumnCityToUserLocationsTable : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "City",
                table: "UserLocations",
                nullable: false,
                defaultValue: "");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "City",
                table: "UserLocations");
        }
    }
}
