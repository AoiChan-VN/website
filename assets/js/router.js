export function openItem(id){

    location.href =
        `viewer.html?id=${
            encodeURIComponent(id)
        }`;
}

export function getItemId(){

    const params =
        new URLSearchParams(
            location.search
        );

    return params.get('id');
}
