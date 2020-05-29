import React, { useEffect, useRef, useState } from 'react';
import VisibilitySensor from 'react-visibility-sensor';
// import styles from './styles.module.scss';

const List = ({component, ...props}) => 
{

    const [height, setHeight] = useState('auto');
    const [visible, setVisibility] = useState(true);
    const onLoad = useRef(() => props.onLoad(),[]);
    const self = useRef(component.ref).current;

    useEffect(() => {
        setHeight(self.current.clientHeight);
        onLoad.current();
    },[onLoad,self]);
    

    return (
        <VisibilitySensor onChange={(visible) => setVisibility(visible)} intervalDelay={300} offset={{top: -1000, bottom: -1000}} partialVisibility>
            {   visible ?
                    <ul ref={component.ref}>
                        {
                            component.list.map((item,index) =>
                                <li key={index}>
                                    {item}
                                </li>
                            )
                        }
                    </ul>
                :   <ul style={{ height }} ref={component.ref}/>
            }
        </VisibilitySensor>
    );
};

export default List;