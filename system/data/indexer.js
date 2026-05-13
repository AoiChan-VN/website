export const Indexer = {

  documents:[],

  add(document){

    this.documents.push(
      document
    );

  },

  all(){

    return this.documents;

  },

  find(query){

    const keyword =
      query.toLowerCase();

    return this.documents.filter(
      document => {

        return (
          document.title
            .toLowerCase()
            .includes(keyword)

          ||

          document.content
            .toLowerCase()
            .includes(keyword)
        );

      }
    );

  }

}; 
