import React, { useEffect, useRef, useState } from 'react';
import VisibilitySensor from 'react-visibility-sensor';
import styles from './styles.module.scss';

const Image = ({component, ...props}) =>
{

    const onLoad = useRef(() => props.onLoad());
    const self = useRef();
    const [height, setHeight] = useState('auto');
    const [visible, setVisibility] = useState(true);

    useEffect(() => {
        setHeight(self.current.clientHeight);
        onLoad.current();
    },[onLoad]);

    return (
        <VisibilitySensor onChange={(visible) => setVisibility(visible)} intervalDelay={300} offset={{top: -1000, bottom: -1000}} partialVisibility>
            {   visible ?
                    <div className={styles.ImageContainer} ref={self}>
                        <img alt={component.text} ref={component.ref} src={component.src} className={styles.Image}/>
                    </div>
                :   <div style={{ height }} ref={component.ref}/>
            }
        </VisibilitySensor>
    );
};

export default Image;