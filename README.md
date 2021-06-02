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
+ Configure the store to search movies by search object, created based on the SearchData interface.
+ Completed quick search function. whenever user search for a movie, it displays the results. 

19/05/2021
+ When a user search for a movie, he redirects to the search component with a query parameter of the search term. So, when he goes to a search result item, refreshes it and comes back to search component, an API call with search term is again sent to get the search data.
+ Minor tweaks to the movie-details UI is added.

20/05/2021
+ Created a component to do advanced searching.
+ Make the UI using flexLayout.

21/05/21
+ Used reactiveForms and its Validators to build the advanced search form.
+ used mat-select and mat-option to make the dropdown lists in the search form.
+ Advanced search form is working properly. Still needs to configure routing.

24/05/21
+ I created another component for server side pagination.
+ Implemented it in advanced searching and it works fine. Need to add it to quick search too. May need to redesign search page.
+ Paginator is added to the SearchComponent.

+ Created a new component LandingPageComponent which has the basic layout of the app. 
+ Configured responsiveness using the ngrx store.
+ Reconfigured routes accordingly. But there are still some bugs are there.

25/05/2021
+ Fixed Minor bugs.

28/05/2021
+ Components are modularized into public and private, and routes are added accordingly.

31/05/2021
+ Fixed some UI bugs in the movie details page.
+ Removed Advanced search as another page and added it to show when a user presses filter icon in the landing page.

01/05/2021
+ Removed the Advanced search implementation and make it as pop up. 
+ BUG: It sends infinite API calls when a user changes page using paginator.

02/05/2021
+ configured ngRx store to save SearchData object when a user search. 
+ Fixed Infinite API call bug.
+ Fixed alignment issue in search results page.
+ Removed navigate to 'search-page/:searchTerm' when using quick search and using ParamMap to send API call when refresh. (Prefer 19/05/2021)
+ Created a new component for preloader, which uses mat-spinner and ngRx store to show when the page is loading. It hides after loading.
+ Preloader component takes an input isLoading$ of Observeable<boolean> and used it to show or hide the component.
 