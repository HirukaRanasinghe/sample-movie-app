# sample-movie-app
Angular sample  app like yts.


14/5/2021
+ Completed actions, reducer for getting all movies and get movie by ID.
+ Added functionality to get all movies in movies.effects.ts.
+ I made the movie card component reusable. Data gained from API call (Array of objects) are iterated to make movie card components and the objects are passed to the movie card component to get the data for the title, genre, year and rating.

16/5/2021
+ Configured routing.
+ Created a new component ('movie-details') to show movie details for a single movie. When a user clicks the 'view more' icon on the movie card, it will navigate to this component.
+ I got the data to movie details component using history.state. But when I refresh the page, the data are gone. So, i need to look for anothe approach.
