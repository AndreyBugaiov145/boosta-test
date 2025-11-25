export default  class JokeControlService {
  constructor(favouriteStoreService) {
    this.modeRadios = document.querySelectorAll('input[name="jokeMode"]');
    this.categories = document.querySelectorAll('#categories .category-pill');
    this.searchInput = this._createSearchInput();
    this.activeCategory = 'celebrity';
    this.activeMode = 'categoryMode';
    this.favouriteStoreService = favouriteStoreService;

    this._initEvents();
    this._initHeartListeners();
  }

  _createSearchInput() {
    const input = document.createElement('input');
    input.type = 'text';
    input.placeholder = 'Type a keyword...';
    input.id = 'searchQuery';
    input.classList.add('form-control', 'mb-4', 'd-none');
    document.querySelector('#categories').after(input);
    return input;
  }

  _initEvents() {
    this.modeRadios.forEach(radio => {
      radio.addEventListener('change', e => {
        this.activeMode = e.target.id;
        if (e.target.id === 'searchMode') {
          this.searchInput.classList.remove('d-none');
        } else {
          this.searchInput.classList.add('d-none');
        }
      });
    });

    this.categories.forEach(cat => {
      cat.addEventListener('click', () => {
        this.categories.forEach(c => c.classList.remove('active'));
        cat.classList.add('active');
        this.activeCategory = cat.textContent.trim().toLowerCase();
      });
    });
  }

  _initHeartListeners() {
    document.addEventListener('click', event => {
      const heart = event.target.closest('.heart-outline');
      if (!heart) return;

      const article = heart.closest('.joke-card');
      if (!article) return;

      const id = article.querySelector('.meta').textContent.replace('ID:', '').trim();
      const text = article.querySelector('.text-small').textContent.trim();
      const category = article.querySelector('.category-tag')?.textContent.trim() || '';
      const updated_at = article.querySelector('.updated-at')?.textContent.trim() || '';

      const jokeObj = { id, value: text, category , updated_at };

      if (this.favouriteStoreService.findById(id)) {
        this.favouriteStoreService.remove(id);
        heart.classList.remove('active');
      } else {
        this.favouriteStoreService.add(jokeObj);
        heart.classList.add('active');
      }

      document.dispatchEvent(new CustomEvent('favouriteChanged'));
    });
  }

  getMode() {
    return this.activeMode;
  }

  getCategory() {
    return this.activeCategory;
  }

  getQuery() {
    return this.searchInput.value.trim();
  }
}
