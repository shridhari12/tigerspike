# Tigerspike
This is the private code repository for the code challenge for TigerSpike.

Approach
========
1. Load the users from db
2. For each user; show locations on the map/ Add Location / Show current locations
3. Plot the points on the Map component (Developed using Angular Google Maps (agm-map)
4. For each point on the map; use the hooks to handle the events

.NET Core
=========
EF Code First migration has been used for database management
Repository Pattern (UoW) pattern has been used to handle interactions with database
Dependency Injection (DI) at Startup.cs has been injected with the required interfaces.

Angular
=======
The Angular SPA has been used to implement the Front end component to manage customers.
Code is managed into modules where each module has its own services, components and models. This approach allows us to manage them according to Single Responsibility Principle


Instructions
============
1. Clone this repository
2. Open Visual Studio Code and open the /TigerspikeCodeChallenge/ClientApp project
3. Open the terminal window and type 'npm install' to install the dependencies
4. type 'npm start' to run the angular app in localhost:4200
5. Open Visual Studio 2019
6. Load the "TigerspikeCodeChallenge" solution
7. Set the 'TigerspikeCodeChallenge' as the start up project
8. In VS2019, open View -> Other -> Package Manager Console
9. Set the 'Tigerspike' database as the current project
10. type 'update-database --verbose' to fire up the local migrations
8. Run the .NETCore project first. This will load up the DbInitializer script to load the database with Seed data.
9. Run the Angular App as per instructions in the Home Page
10. The Home page of the Angular app will guide you through the app.
