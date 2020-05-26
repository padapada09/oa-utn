import React, { useEffect, useRef } from 'react';
// import styles from './styles.module.scss';

const Text = ({component, ...props}) => 
{

    const onLoad = useRef(() => props.onLoad(),[]);

    useEffect(() => {
        onLoad.current();
    },[onLoad]);
    

    return (
        <div ref={component.ref}>
            <p>{component.text}</p>
        </div>
    );
};

export default Text;