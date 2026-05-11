import { Renderer } from './Renderer.js';
import { Panel } from './Panel.js';

class App {

  async init() {

    const profileData = await this.loadProfiles();

    Renderer.renderCards(profileData);

    Panel.init();
  }

  async loadProfiles() {

    try {

      const response = await fetch('./data/profile.json');

      if (!response.ok) {
        throw new Error('Cannot load profile.json');
      }

      return await response.json();

    } catch (error) {

      console.error(error);

      return [];
    }
  }
}

const app = new App();

app.init(); 
