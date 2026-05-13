export const TokenService = {

  create(){

    return crypto.randomUUID();
  },

  validate(token){

    return (
      typeof token === "string" &&
      token.length > 20
    );

  }

}; 
