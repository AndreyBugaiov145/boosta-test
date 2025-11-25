export default  class FavouriteStoreService {
  constructor(storageKey = 'jokes') {
    this.storageKey = storageKey;
  }

  getAll() {
    return JSON.parse(localStorage.getItem(this.storageKey)) || [];
  }

  _saveAll(jokes) {
    localStorage.setItem(this.storageKey, JSON.stringify(jokes));
  }

  add(joke) {
    if (!joke || !joke.id) return;
    const jokes = this.getAll();
    const exists = jokes.some(j => j.id === joke.id);
    if (!exists) {
      jokes.push(joke);
      this._saveAll(jokes);
    }
  }

  remove(id) {
    const jokes = this.getAll().filter(j => j.id !== id);
    this._saveAll(jokes);
  }

  findById(id) {
    return this.getAll().find(j => j.id === id);
  }

  clear() {
    localStorage.removeItem(this.storageKey);
  }
}
