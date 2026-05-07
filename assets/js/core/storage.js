/**
 * Project: AoiChan Portfolio
 * Author: AoiChan
 * License: MIT
 */

export class StorageManager {

  static set(key, value) {

    localStorage.setItem(
      key,
      JSON.stringify(value)
    );

  }

  static get(key, fallback = null) {

    const value =
      localStorage.getItem(key);

    if (!value) {
      return fallback;
    }

    try {

      return JSON.parse(value);

    } catch {

      return fallback;

    }

  }

  static remove(key) {

    localStorage.removeItem(key);

  }

  static clear() {

    localStorage.clear();

  }

} 
