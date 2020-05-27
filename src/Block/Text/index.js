import React, { useEffect, useRef } from 'react';
import styles from './styles.module.scss';

const Text = ({component, ...props}) => 
{

    const onLoad = useRef(() => props.onLoad(),[]);

    useEffect(() => {
        onLoad.current();
    },[onLoad]);
    

    return <p ref={component.ref} className={styles.Text}>{component.text}</p>;
};

export default Text;