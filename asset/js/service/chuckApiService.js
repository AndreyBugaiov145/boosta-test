export default class ChuckApiService {
  constructor(baseUrl = 'https://api.chucknorris.io/jokes') {
    this.baseUrl = baseUrl;
  }

  async getRandomJoke() {
    return this._fetchJson(`${this.baseUrl}/random`);
  }

  async getRandomJokeByCategory(category) {
    return this._fetchJson(`${this.baseUrl}/random?category=${encodeURIComponent(category)}`);
  }

  async getCategories() {
    return this._fetchJson(`${this.baseUrl}/categories`);
  }

  async searchJokes(query) {
    return this._fetchJson(`${this.baseUrl}/search?query=${encodeURIComponent(query)}`);
  }

  async _fetchJson(url) {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('ChuckApiService error:', error);
      return { error: error.message };
    }
  }
}
