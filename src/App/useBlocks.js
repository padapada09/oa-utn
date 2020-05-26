import { useState, useEffect, createRef } from 'react';

const useBlocks = (book) =>
{

    const [blocks, setBlocks] = useState({loading: true});

    useEffect(() =>
    {
        const generateRefsToBlocks = () => {

            const generateRefsToComponents = (block, components) => {
                const ref = createRef();
                return {ref, ...block, components: components.map(component => {
                    if (component.type === 'block') return generateRefsToComponents(component.components);
                    else return {ref: createRef(), ...component, block: {...block, ref}};
                })};
            }
        
            return book.map((block) => {
                const ref = createRef();
                return {ref, ...block, type: 'block', components: block.components.map(component => {
                    if (component.type === 'block') return generateRefsToComponents(component, component.components);
                    else return {ref: createRef(), ...component, block: {...block, ref}};
                })};
            });
        }

        setBlocks(generateRefsToBlocks());

    },[book]);
    
    return blocks;
}

export default useBlocks;