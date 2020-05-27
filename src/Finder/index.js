import React, { useState, useEffect, useRef } from 'react';
import { Form, InputGroup, Button } from 'react-bootstrap';
import FinderEngine from './FinderEngine';

const Finder = ({blocks, setResults, results, focusSearch, collapse}) =>
{

    const [query, setQuery] = useState('');
    const [engine] = useState(new FinderEngine(blocks));
    const [error, setError] = useState(null);
    const self = useRef();

    useEffect(() => {

        engine.search(query).then(res => {
            console.log(res);
            setResults(res);
        }).catch((err) => {
            console.log(err);
            setError(err);
        })

        return () => {
            setResults([]);
            setError(null);
        }

    },[query,engine,setResults]);

    return (
        <Form style={{padding: '10px', flex: 1, overflow: 'hidden'}} onSubmit={(event) => event.preventDefault() || self.current.blur()}>
            <InputGroup style={{flexWrap: 'nowrap'}}>
                <Form.Control
                ref={self}
                onFocus={() => focusSearch(true) || collapse(false)}
                onBlur={() => !query && focusSearch(false)}
                isValid={results.length}
                isInvalid={error}
                value={query}
                placeholder="Escribí aquí para buscar un tema" 
                onChange={(event) => setQuery(event.target.value)}/>
                <InputGroup.Append>
                    <Button variant="outline-secondary" onClick={() => setQuery('') || focusSearch(false)}>x</Button>
                </InputGroup.Append>
            </InputGroup>
        </Form>
    )
}

export default Finder;

// const looseIndexOfWord = (string_a, string_b, offset = 0) => 
// {
//     console.log(`/\b${string_b.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")}\b/`);
//     console.log(string_a.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").slice(offset).search(`/\b${string_b.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")}\b/`));
//     const regex = new RegExp(`/\b${string_b.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")}\b/`);
//     return string_a.toLowerCase()
//     .normalize("NFD")
//     .replace(/[\u0300-\u036f]/g, "")
//     .slice(offset)
//     .search(regex);
// }