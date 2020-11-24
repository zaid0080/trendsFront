import { useEffect } from 'react'

function useOnClickOutside(ref, callback) {
    useEffect(()=> {
        const listener = event => {
            if( ref.current || !ref.current.contains(event.target)){
                callback();
            }
        };
        document.addEventListener('click', listener);
        // document.addEventListener('touchstart', listener);

        return () => {
            document.removeEventListener('click', listener);
            // document.removeEventListener('touchstart', listener);
        }
    })
};

export default useOnClickOutside;
