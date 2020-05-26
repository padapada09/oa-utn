import React, { useEffect, useRef } from 'react';
import styles from './styles.module.scss';

const Image = ({component, ...props}) =>
{

    const onLoad = useRef(() => props.onLoad());

    useEffect(() => { onLoad.current() },[]);

    return (
        <div className={styles.ImageContainer}>
            <img alt={component.text} ref={component.ref} src={component.src} onLoad={onLoad} className={styles.Image}/>
        </div>
    );
};

export default Image;