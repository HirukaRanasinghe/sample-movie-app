# sample-movie-app
Angular sample  app like yts.


14/5/2021
+ Completed actions, reducer for getting all movies and get movie by ID.
+ Added functionality to get all movies in movies.effects.ts.
+ I made the movie card component reusable. Data gained from API call (Array of objects) are iterated to make movie card components and the objects are passed to the movie card component to get the data for the title, genre, year and rating.

16/5/2021
+ Configured routing.
+ Created a new component ('movie-details') to show movie details for a single movie. When a user clicks the 'view more' icon on the movie card, it will navigate to this component.
+ I got the data to movie details component using history.state. But when I refresh the page, the data are gone. So, i need to look for another approach.

17/5/2021
+ Removed usage of state when routing and history.state.
+ When a user press more details button in movie card, he is sent to movie-details component with route parameter 'id', Which is the movie_id of the selected movie.
+ I configured the store to make an API call to get movie details with given movie_id.
+ After I get the data, I set background, title, genres, movie poster and movie description in a card-like layout. Need few tweaks to complete it.

18/5/2021
+ Configured the ngrx store to Get movies by search term.
+ Added new layout to the movie-details page.
+ Created an interface for Advanced searching, where it takes various search parameters. 