export const TrustManager = {

  trusted:new Set(),

  trust(app){

    this.trusted.add(app);

  },

  revoke(app){

    this.trusted.delete(app);

  },

  isTrusted(app){

    return this.trusted.has(app);

  }

}; 
