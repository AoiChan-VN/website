export const ManifestValidator = {

  required:[
    "id",
    "title",
    "icon",
    "entry"
  ],

  validate(manifest){

    const missing = [];

    for(
      const field
      of this.required
    ){

      if(
        manifest[field] === undefined
      ){

        missing.push(field);

      }

    }

    return {

      valid:
        missing.length === 0,

      missing

    };

  }

}; 
