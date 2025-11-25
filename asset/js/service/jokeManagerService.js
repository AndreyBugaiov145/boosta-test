export default class JokeManagerService {
  constructor(apiService, commentService, controlService, favouriteStoreService) {
    this.apiService = apiService;
    this.commentService = commentService;
    this.controlService = controlService;
    this.favouriteStoreService = favouriteStoreService;

    this.favouriteContainer = document.querySelector('#favouriteList');
    this._initStorageWatcher();
    this._renderStoredFavourites();
  }

  _initStorageWatcher() {
    window.addEventListener('storage', (event) => {
      if (event.key === this.favouriteStoreService.storageKey) {
        this._renderStoredFavourites();
      }
    });

    document.addEventListener('favouriteChanged', () => {
      this._renderStoredFavourites();
    });
  }

  _renderStoredFavourites() {
    if (!this.favouriteContainer) return;

    this.favouriteContainer.innerHTML = '';

    const jokes = this.favouriteStoreService.getAll();

    if (jokes.length === 0) {
      this.favouriteContainer.innerHTML = `<p class="text-muted small text-center mt-3">No favourites yet 😅</p>`;
      return;
    }

    jokes.forEach(joke => {
      this.commentService._renderJoke(joke, joke.category, this.favouriteContainer);
    });
  }

  async handleJokeRequest() {
    const mode = this.controlService.getMode();
    let jokeData;

    if (mode === 'randomMode') {
      jokeData = await this.apiService.getRandomJoke();
    } else if (mode === 'categoryMode') {
      const category = this.controlService.getCategory();
      jokeData = await this.apiService.getRandomJokeByCategory(category);
    } else if (mode === 'searchMode') {
      const query = this.controlService.getQuery();
      if (!query) return alert('Please enter a search term!');
      const result = await this.apiService.searchJokes(query);
      if (result.result?.length) {
        jokeData = result.result[Math.floor(Math.random() * result.result.length)];
      } else {
        return alert('No jokes found for your search 😅');
      }
    }

    if (jokeData) {
      this.commentService._renderJoke(jokeData, this.controlService.getCategory());
    }
  }
}
