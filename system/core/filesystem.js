export const FileSystem = {

  root:"nova-runtime",

  initialize(){

    if(
      !localStorage.getItem(
        this.root
      )
    ){

      localStorage.setItem(
        this.root,
        JSON.stringify({
          packages:{},
          files:{},
          settings:{}
        })
      );

    }

  },

  read(){

    return JSON.parse(
      localStorage.getItem(
        this.root
      )
    );

  },

  write(data){

    localStorage.setItem(
      this.root,
      JSON.stringify(data)
    );

  },

  writeFile(path, value){

    const fs =
      this.read();

    fs.files[path] = value;

    this.write(fs);

  },

  readFile(path){

    const fs =
      this.read();

    return fs.files[path] ?? null;

  },

  installPackage(pkg){

    const fs =
      this.read();

    fs.packages[pkg.id] = pkg;

    this.write(fs);

  },

  packages(){

    return Object.values(
      this.read().packages
    );

  }

}; 
