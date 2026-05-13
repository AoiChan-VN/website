export const KnowledgeGraph = {

  nodes:new Map(),

  connect(a, b){

    if(
      !this.nodes.has(a)
    ){

      this.nodes.set(
        a,
        new Set()
      );

    }

    this.nodes
      .get(a)
      .add(b);

  },

  related(node){

    return [
      ...(this.nodes.get(node)
      || [])
    ];

  }

}; 
