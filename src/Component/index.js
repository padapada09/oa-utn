import React from 'react';
import Text from './Text';

const Component = (props) => {
    switch (props.tipo) {
        case 'titulo': return <h1>{props.texto}</h1>;
        case 'subtitulo': return <h2>{props.texto}</h2>;
        case 'texto': return <Text {...props}/>;
        case 'imagen': return <img alt={props.alt} src={props.src} style={{width: '100%'}}/>;
        default: throw new Error(`El componente de tipo ${props.tipo} no existe.`);
    }
}

export default Component;