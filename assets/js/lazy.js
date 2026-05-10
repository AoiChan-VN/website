import { CONFIG } from './config.js';

const observer = new IntersectionObserver(

    entries=>{

        entries.forEach(entry=>{

            if(!entry.isIntersecting) return;

            entry.target.classList.add('visible');

            observer.unobserve(entry.target);
        });

    },

    {
        rootMargin:CONFIG.OBSERVER_ROOT_MARGIN
    }
);

export function observe(node){

    observer.observe(node);
} 
