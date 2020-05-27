import React, { useEffect, useRef } from 'react';
// import styles from './styles.module.scss';

const List = ({component, ...props}) => 
{

    const onLoad = useRef(() => props.onLoad(),[]);

    useEffect(() => {
        onLoad.current();
    },[onLoad]);
    

    return (
        <ul ref={component.ref}>
            {
                component.list.map((item,index) =>
                    <li key={index}>
                        {item}
                    </li>
                )
            }
        </ul>
    );
};

export default List;