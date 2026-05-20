export class VirtualDOM {
    patch(container, nextHTML) {
        const template =
            document.createElement('template');

        template.innerHTML = nextHTML.trim();

        const nextNode =
            template.content.firstElementChild;

        const currentNode =
            container.firstElementChild;

        if (!currentNode) {
            container.appendChild(nextNode);

            return;
        }

        if (
            currentNode.outerHTML !==
            nextNode.outerHTML
        ) {
            container.replaceChild(
                nextNode,
                currentNode
            );
        }
    }
} 
