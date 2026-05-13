const PROTECTED = [

  "/system",
  "/kernel",
  "/security"
];

export const FileSystemGuard = {

  writable(path){

    return !PROTECTED.some(
      protectedPath =>
        path.startsWith(
          protectedPath
        )
    );

  }

}; 
