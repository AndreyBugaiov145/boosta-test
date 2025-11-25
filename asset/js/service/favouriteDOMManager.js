export default class FavouriteDOMManager {
  constructor() {
    this.favContainer = document.getElementById('favouriteList');
    this.desktopWrapper = document.querySelector('.sidebar .favourite-wrapper');
    this.mobileWrapper = document.querySelector('.offcanvas-body .favourite-wrapper');
    this._updatePlacement();
    window.addEventListener('resize', () => this._updatePlacement());
  }

  _updatePlacement() {
    if (window.innerWidth < 992) {
      if (!this.mobileWrapper.contains(this.favContainer)) {
        this.mobileWrapper.appendChild(this.favContainer);
      }
    } else {
      if (!this.desktopWrapper.contains(this.favContainer)) {
        this.desktopWrapper.appendChild(this.favContainer);
      }
    }
  }
}


