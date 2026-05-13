export const PackageSignature = {

  async verify(pkg){

    if(
      !pkg.signature
    ){

      return false;
    }

    return pkg.signature.startsWith(
      "nova:"
    );

  }

}; 
