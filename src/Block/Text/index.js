import React, { useEffect, useRef, useState } from 'react';
import styles from './styles.module.scss';
import VisibilitySensor from 'react-visibility-sensor';

const Text = ({component, ...props}) => 
{

    const [height, setHeight] = useState('auto');
    const [visible, setVisibility] = useState(true);
    const onLoad = useRef(() => props.onLoad());
    const self = useRef(component.ref).current;

    useEffect(() => {
        setHeight(self.current.clientHeight);
        onLoad.current();
    },[onLoad,self]);

    return (
        <VisibilitySensor onChange={(visible) => setVisibility(visible)} intervalDelay={300} offset={{top: -1000, bottom: -1000}} partialVisibility>
            {   visible ?
                    <p 
                    ref={component.ref}
                    className={styles.Text} 
                    style={{ height }}>
                        {component.text}
                    </p>
                : <p style={{ height }} ref={component.ref}/>
            }
        </VisibilitySensor>

    )
};

export default Text;