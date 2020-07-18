import { useState, useEffect, createRef } from 'react';

const useBlocks = (book) =>
{

    const [blocks, setBlocks] = useState([]);

    useEffect(() =>
    {

        setBlocks([]);
        
        const generateRefsToBlocks = (book) => {

            const generateRefsToComponents = (block, parent_block) => {
                const ref = createRef();
                return {ref, ...block, block: parent_block, components: block.components.map(component => {
                    if (component.type === 'block') return generateRefsToComponents(component);
                    else return {ref: createRef(), ...component, block: {...block, ref}};
                })};
            }
        
            return book.map((block) => {
                const ref = createRef();
                return {ref, ...block, type: 'block', components: block.components.map(component => {
                    if (component.type === 'block') return generateRefsToComponents(component,{ref, ...block});
                    else return {ref: createRef(), ...component, block: {...block, ref}};
                })};
            });
        }

        if (book && book.length) setBlocks(() => {
            const res = generateRefsToBlocks(book);
            return res;
        });

    },[book]);
    
    return blocks;
}

export default useBlocks;