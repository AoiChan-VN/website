async function loadData(){

  const response =
    await fetch("./data/aoi-file.json");

  const folders =
    await response.json();

  const allItems = [];

  for(const folderPath of folders){

    const folderResponse =
      await fetch(folderPath);

    const folderData =
      await folderResponse.json();

    allItems.push(...folderData);
  }

  return allItems;
} 
