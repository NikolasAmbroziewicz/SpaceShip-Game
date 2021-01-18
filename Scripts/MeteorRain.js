import { Meteor } from "./Meteor.js";

export class MeteorRain {
  listMeteors = [];
  #messeges = ["3", "2", "1"];
  #numerOfInformations = 0;
  #currentMetor = 0;
  constructor(container, infoPopup, sky, level) {
    this.container = container;
    this.infoPopup = infoPopup;
    this.sky = sky;
    this.numberOfMeteors = level + 5;
    this.interval = null;
  }

  start() {
    this.infoPopup.classList.remove("hide");
    this.infoPopup.innerHTML = "Meteors are comming!";
    this.#startAnimation();
    setTimeout(() => {
      this.infoPopup.classList.add("hide");
      this.#startRain();
    }, 3600);
  }

  #startRain() {
    this.toggleSkyClassList();
    this.interval = setInterval(() => this.#createMeteor(), 500);
  }

  #createMeteor() {
    if (this.#currentMetor < this.numberOfMeteors) {
      const meteor = new Meteor(this.container, "meteors");
      meteor.start();
      this.listMeteors.push(meteor);
      this.#currentMetor++;
    } else {
      clearInterval(this.interval);
    }
  }

  #startAnimation() {
    setTimeout(() => {
      this.infoPopup.innerHTML = this.#messeges[this.#numerOfInformations];
      this.#numerOfInformations++;
      if (this.#numerOfInformations < this.#messeges.length) {
        this.#startAnimation();
      }
    }, 600);
  }

  toggleSkyClassList() {
    if (this.sky.classList.contains("move")) {
      this.sky.classList.remove("move");
      this.sky.classList.add("meteor");
    } else if (this.sky.classList.contains("meteor")) {
      this.sky.classList.remove("meteor");
      this.sky.classList.add("move");
      this.#resetSettings();
    }
  }

  #resetSettings() {
    this.#currentMetor = 0;
    this.#numerOfInformations = 0;
    clearInterval(this.interval);
  }
}
