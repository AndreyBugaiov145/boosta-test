export default class CommentService {
  constructor(templatePath = '../../../templates/jokeTemplate.html', containerSelector = '#articles') {
    this.templatePath = templatePath;
    this.template = null;
  }

  async loadTemplate() {
    if (this.template) return this.template;
    const res = await fetch(this.templatePath);
    this.template = await res.text();
    return this.template;
  }

  async _renderJoke(joke, category = '', container = document.querySelector('#articles')) {
    const template = await this.loadTemplate();
    const html = template
      .replace('{{id}}', joke.id)
      .replace('{{value}}', joke.value)
      .replace('{{category}}', category)
      .replace('{{updated_at}}', (new Date(joke.updated_at).toLocaleString()));

    const wrapper = document.createElement('div');
    wrapper.innerHTML = html.trim();
    const article = wrapper.firstElementChild;

    container.prepend(article);
  }
}
