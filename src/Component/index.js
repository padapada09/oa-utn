import React from 'react';
import Text from './Text';

const Component = (props) => {
    switch (props.tipo) {
        case 'texto': return <Text {...props}/>;
        case 'titulo': return <h1>{props.texto}</h1>;
        case 'imagen': return <img src={props.src} style={{width: '100%'}}/>;
        default: return "No existe este componente";
    }
}

export default Component;