import React, { useEffect, useRef, useState } from 'react';
import VisibilitySensor from 'react-visibility-sensor';
import styles from './styles.module.scss';

const Video = ({component, ...props}) =>
{

    const onLoad = useRef(() => props.onLoad());
    const self = useRef();
    const [height, setHeight] = useState('240px');
    const [visible, setVisibility] = useState(true);

    useEffect(() => {
        onLoad.current();
    },[onLoad]);

    return (
        <VisibilitySensor onChange={(visible) => setVisibility(visible)} intervalDelay={300} offset={{top: 0, bottom: 0}} partialVisibility>
            {   visible ?
                    <video width="320" height={height} controls>
                        <source src={component.src} type="video/mp4"/>
                        Your browser does not support the video tag.
                    </video>
                :   <div style={{ height }} ref={component.ref}/>
            }
        </VisibilitySensor>
    );
};

export default Video;