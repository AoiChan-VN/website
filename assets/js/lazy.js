const observer =
    new IntersectionObserver(

        entries=>{

            for(const entry of entries){

                if(
                    !entry.isIntersecting
                ){
                    continue;
                }

                entry.target
                    .classList
                    .add('visible');

                observer.unobserve(
                    entry.target
                );
            }

        },

        {
            rootMargin:'300px'
        }
    );

export function observe(node){

    observer.observe(node);
}
