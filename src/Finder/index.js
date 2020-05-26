import React, { useState, useEffect, useRef } from 'react';
import { Form, InputGroup, Button } from 'react-bootstrap';

const Finder = ({blocks, setResults, results, focusSearch, collapse}) =>
{

    const [search, setSearch] = useState('');
    const [error, setError] = useState(null);
    const self = useRef();

    useEffect(() => {

        if (search) {
            const searchBlock = (block) => {
                return block.components
                .filter(component => ['block','text'].includes(component.type))
                .map(component => {
                    if (component.type === 'block') return searchBlock(component);
                    let appearences = [];
                    let index = component.text.indexOf(search);
                    while (index !== -1) {
                        appearences.push(index);
                        index = component.text.indexOf(search,index + 1);
                    }
                    return appearences.length ? appearences.map(appearence => ({...component, index: appearence})) : null;
                })
            }
    
            const results = blocks.map(block => searchBlock(block)).flat(Infinity).filter(block => block !== null);
            if (results.length) {
                setResults(results);
                setError(null);
            } else {
                setResults([]);
                setError('No se encontró resultados');
            }
        } else {
            setResults([]);
            setError(null);
        }

    },[search,blocks,setResults]);

    return (
        <Form style={{padding: '10px', flex: 1, overflow: 'hidden'}} onSubmit={(event) => event.preventDefault() || self.current.blur()}>
            <InputGroup style={{flexWrap: 'nowrap'}}>
                <Form.Control
                ref={self}
                onFocus={() => focusSearch(true) || collapse(false)}
                onBlur={() => !search && focusSearch(false)}
                isValid={results.length}
                isInvalid={error}
                value={search}
                placeholder="Escribí aquí para buscar un tema" 
                onChange={(event) => setSearch(event.target.value)}/>
                <InputGroup.Append>
                    <Button variant="outline-secondary" onClick={() => setSearch('') || focusSearch(false)}>x</Button>
                </InputGroup.Append>
            </InputGroup>
        </Form>
    )
}

export default Finder;