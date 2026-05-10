export function el(tag,cls=''){

    const node = document.createElement(tag);

    node.className = cls;

    return node;
} 
