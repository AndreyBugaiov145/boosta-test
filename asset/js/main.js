import ChuckApiService from './service/chuckApiService.js';
import CommentService from './service/commentService.js';
import JokeControlService from './service/jokeControlService.js';
import JokeManagerService from './service/jokeManagerService.js';
import FavouriteStoreService from './service/favouriteStoreService.js';
import FavouriteDOMManager from './service/favouriteDOMManager.js';


new FavouriteDOMManager();
const api = new ChuckApiService();
const comments = new CommentService();
const favs = new FavouriteStoreService();
const controls = new JokeControlService(favs);
const manager = new JokeManagerService(api, comments, controls, favs);

document.querySelector('#getJokeBtn').addEventListener('click', () => {
  manager.handleJokeRequest();
});
