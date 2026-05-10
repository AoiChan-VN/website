export function create(tag,cls){

    const node =
        document.createElement(tag);

    if(cls){

        node.className = cls;
    }

    return node;
}

export function clear(node){

    while(node.firstChild){

        node.removeChild(
            node.firstChild
        );
    }
}
