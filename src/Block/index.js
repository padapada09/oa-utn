import React, { useState, useRef, useEffect, useMemo } from 'react';
import VisibilitySensor from 'react-visibility-sensor';
import Image from './Image';
import Text from './Text';

const Block = ({block, onLoad = () => undefined}) =>
{

    const [isVisible, setVisibility] = useState(true);
    const [height, setHeight] = useState('auto');
    const [loaded_components, setLoadedComponents] = useState(0);
    const loaded = useMemo(() => loaded_components === block.components.length ? true : false,[loaded_components,block]);
    const self = useRef();

    useEffect(() => {
        if (loaded && height === 'auto') {
            const _height = self.current.clientHeight;
            setHeight(`${_height}px`);
            onLoad();
        }
    },[loaded,onLoad,height]);

    return (
        <VisibilitySensor onChange={(visible) => setVisibility(visible)} intervalDelay={100} partialVisibility>
            <div>
                <h1 ref={block.ref}>{block.title}</h1>
                <div ref={self} style={{height: height}}>
                    {
                        block.components.map((component, index) => {
                    
                            switch (component.type) {
                                case 'text': return !isVisible && height !== 'auto' ? null : <Text key={index} component={component} onLoad={() => setLoadedComponents(previous => previous + 1)}/>;
                                case 'img': return !isVisible && height !== 'auto' ? null : <Image key={index} component={component} onLoad={() => setLoadedComponents(previous => previous + 1)}/>;
                                case 'block': return <Block key={index} block={component} onLoad={() => setLoadedComponents(previous => previous + 1)}/>;
                                default: return (<h2 key={index}>Component not suported {component.typ}</h2>);
                            }
                
                        })

                    }
                </div>
            </div>
        </VisibilitySensor>
    )
};

export default Block;