export default function addImageToBlocks (blocks,name,data) {
    let _blocks = (blocks instanceof Array) ? blocks : [blocks];
    _blocks = _blocks.map(block => ({
        ...block, 
        components: block.components.map(component => {
            if (component.type === 'img' && component.name === name) return ({...component, src: `data:image/jpeg;base64,${data}`});
            else if (component.type === 'block') return addImageToBlocks(component,name,data)[0];
            else return component;
        })
    }));
    return _blocks;
}