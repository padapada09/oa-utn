export default function getComponentAmount (_blocks) {
    let blocks;
    let amount = 0;
    if (_blocks instanceof Array) blocks = _blocks;
    else blocks = [_blocks];
    for (let block of blocks) {
        for (let component of block.components) {
            if (component.type !== 'block') amount++;
            else amount += getComponentAmount(component);
        }
    }
    return amount;
}