import React, { useEffect, useRef, useState } from 'react';
import VisibilitySensor from 'react-visibility-sensor';
// import styles from './styles.module.scss';

const Youtube = ({component, ...props}) =>
{

    const onLoad = useRef(() => props.onLoad());
    const [height, _] = useState(window.innerWidth > 1100 ? window.innerWidth/4 : window.innerWidth/2);
    const [visible, setVisibility] = useState(true);

    useEffect(() => {
        onLoad.current();
    },[onLoad]);

    return (
        <VisibilitySensor onChange={(visible) => setVisibility(visible)} intervalDelay={300} offset={{top: 0, bottom: 0}} partialVisibility>
            {   visible ?
                    <div style={{ height, width: '100%', display: 'flex', justifyContent: 'center'}}>
                        <iframe width={window.innerWidth > 1100 ? window.innerWidth/2 : window.innerWidth- 40} height={height} src={`https://www.youtube.com/embed/${component.id}`}/>
                    </div>
                :   <div style={{ height }} ref={component.ref}/>
            }
        </VisibilitySensor>
    );
};

export default Youtube;