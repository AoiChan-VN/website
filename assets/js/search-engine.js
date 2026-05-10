export function searchItems(
    items,
    query
){

    const q =
        query
        .trim()
        .toLowerCase();

    if(!q){

        return items;
    }

    return items.filter(item=>{

        const text = [

            item.name,

            item.description,

            ...(item.tags || [])

        ]
        .join(' ')
        .toLowerCase();

        return text.includes(q);
    });
} 
