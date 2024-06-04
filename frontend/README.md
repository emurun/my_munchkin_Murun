# Welcome to MunchkinMenu!
By: Brianna Rogers, Murun Enkhtaivan, and Vi Trinh

The backend of MunchkinMenu was created using Java's Spring-Boot framework, and the frontend with Javascript's React. To start up the application, make sure you have the proper development by following this guide and downloading Maven & Node if you don't have them already:

[Getting Started with Spring Boot](https://docs.spring.io/spring-boot/docs/current/reference/html/getting-started.html#:~:text=Spring%20Boot%20is%20compatible%20with,Homebrew%2C%20try%20brew%20install%20maven%20) , [Maven Download](https://maven.apache.org/download.cgi) , [Node Download](https://nodejs.org/en/)

In the MunchkinMenu directory, open recipeapp -> resources -> application.properties and replace the username and password with your local username and password for sql. Then, open pom.xml and make sure the sql and java versions listed match the ones on your system.

You will also need to instantiate a database in mysql called "project157a" for the application to use.

Once the project is all set up,

## Scripts

In recipeapp directory, run: ./mvnw spring-boot:run
In the project directory (MunchkinMenu), run: npm start

To start up the back and front end of the application.
Open [http://localhost:3000](http://localhost:3000) to view it in your browser, and test it out! You can try creating an account, making a recipe, or clicking a recipe and commenting on/rating it.

To view the the different tables and their normalization, see our [Project Report](https://docs.google.com/presentation/d/1xRaPS3pTx0bKNlxLpdGZACH39N6bx_QxXbmUECpMhsk/edit#slide=id.g1e2336377bb_1_0).

# Enjoy! :)


