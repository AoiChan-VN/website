import { Indexer }
from "./indexer.js";

export const KnowledgeSearch = {

  search(query){

    return Indexer.find(query);

  }

}; 
