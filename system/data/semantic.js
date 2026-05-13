import { KnowledgeGraph }
from "./graph.js";

export const SemanticRuntime = {

  analyze(documents){

    for(const document of documents){

      const words =
        document.content
          .toLowerCase()
          .split(/\W+/);

      const unique =
        [...new Set(words)];

      unique.forEach(
        word => {

          unique.forEach(
            related => {

              if(word === related){
                return;
              }

              KnowledgeGraph.connect(
                word,
                related
              );

            }
          );

        }
      );

    }

  }

}; 
