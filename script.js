const API_KEY = '6e049927';
const movieSearch = document.getElementById('movieSearch');
const movieList = document.getElementById('movieList');

async function searchMovies() {
    const searchTerm = movieSearch.value.trim();
    
    if (searchTerm.length < 2) {
        alert('Please enter at least 2 characters');
        return;
    }

    showLoading();

    try {
        const response = await fetch(`https://www.omdbapi.com/?apikey=${API_KEY}&s=${searchTerm}`);
        const data = await response.json();

        if (data.Response === 'True') {
            displayMovies(data.Search);
        } else {
            movieList.innerHTML = `
                <div style="text-align: center; grid-column: 1/-1;">
                    <h2>No movies found</h2>
                    <p>Try different keywords</p>
                </div>`;
        }
    } catch (error) {
        console.error('Error:', error);
        movieList.innerHTML = `
            <div style="text-align: center; grid-column: 1/-1;">
                <h2>Something went wrong</h2>
                <p>Please try again later</p>
            </div>`;
    }
}

function displayMovies(movies) {
    movieList.innerHTML = movies.map(movie => `
        <div class="movie-card">
            <img src="${movie.Poster !== 'N/A' ? movie.Poster : 'https://via.placeholder.com/350x500?text=No+Poster'}" 
                 alt="${movie.Title}">
            <div class="movie-info">
                <h3>${movie.Title}</h3>
                <p>Year: ${movie.Year}</p>
                <p>Type: ${movie.Type.charAt(0).toUpperCase() + movie.Type.slice(1)}</p>
            </div>
        </div>
    `).join('');
}

movieSearch.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        searchMovies();
    }
});

function showLoading() {
    movieList.innerHTML = `
        <div style="text-align: center; grid-column: 1/-1;">
            <h2>Loading...</h2>
        </div>`;
} 