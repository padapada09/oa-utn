import React, { useEffect, useRef, useState, useMemo } from 'react';
import VisibilitySensor from 'react-visibility-sensor';

const Geogebra = ({component, ...props}) =>
{

    const onLoad = useRef(() => props.onLoad());
    const height = useMemo(() => window.innerWidth > 1100 ? window.innerWidth/4 : window.innerWidth/2,[]);
    const width = useMemo(() => window.innerWidth > 1100 ? window.innerWidth/2 : window.innerWidth- 40,[])
    const [visible, setVisibility] = useState(true);

    useEffect(() => {
        onLoad.current();
    },[onLoad]);

    return (
        <VisibilitySensor onChange={(visible) => setVisibility(visible)} intervalDelay={300} offset={{top: 0, bottom: 0}} partialVisibility>
            {   visible ?
                    <div style={{ height, width: '100%', display: 'flex', justifyContent: 'center'}}>
                        <iframe 
                        title="Youtube"
                        src={`https://www.geogebra.org/material/iframe/id/${component.id}/width/${width}/height/${height}/border/888888/rc/true/ai/false/sdz/true/smb/false/stb/false/stbh/false/ld/false/sri/false`}
                        width={`${width}px`}
                        height={`${height}px`}
                        style={{border: '0px'}}/>
                    </div>
                :   <div style={{ height }} ref={component.ref}/>
            }
        </VisibilitySensor>
    );
};

export default Geogebra;