import React, { useRef } from 'react';
import Image from './Image';
import Text from './Text';
import List from './List';
import Youtube from './Youtube';
import styles from './styles.module.scss';

const Block = ({block, onLoad}) =>
{

    return (
        <>
            <h1 ref={block.ref} className={styles.Title} tabIndex={0} role="Titulo de bloque">{block.title}</h1>
            {
                block.components.map((component, index) => {
                    switch (component.type) {
                        case 'text': return <Text key={index} component={component} onLoad={onLoad}/>;
                        case 'img': return <Image key={index} component={component} onLoad={onLoad}/>;
                        case 'list': return <List key={index} component={component} onLoad={onLoad}/>;
                        case 'youtube': return <Youtube key={index} component={component} onLoad={onLoad}/>;
                        case 'block': return <Block key={index} block={component} onLoad={onLoad}/>;
                        default:
                            console.error(`El componente ${component.name} de tipo ${component.type} no es un componente valido`);
                            return <h2 key={index}>Component not suported {component.typ}</h2>;
                    }
        
                })

            }
        </>
    )
};

export default Block;