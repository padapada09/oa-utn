import React, { useState, useEffect, useRef, useMemo } from 'react';
import { Form, InputGroup, Button } from 'react-bootstrap';
import FinderEngine from './FinderEngine';
import styles from './styles.module.scss';

const Finder = ({blocks, setResults, results, onFocus, onBlur}) =>
{

    const [query, setQuery] = useState('');
    const engine = useMemo(() => new FinderEngine(blocks),[blocks]);
    const [error, setError] = useState(null);
    const self = useRef();

    useEffect(() => {
        document.onkeydown = (event) => {
            if (event.keyCode === 70 && event.ctrlKey) {
                event.preventDefault();
                self.current.select();
                onFocus();
            }
            
            if (self.current === document.activeElement && event.keyCode === 27) {
                event.preventDefault();
                self.current.blur();
                setQuery('');
                onBlur();
            }
        }
    },[onBlur,onFocus]);

    useEffect(() => {

        engine.search(query).then(res => {
            setResults(res);
            setError(null);
        }).catch((err) => {
            setError(err);
            setResults([]);
        });

    },[query,engine,setResults]);

    function onSubmit (event) {
        event.preventDefault();
        self.current.blur();
    }

    function onCancel () {
        setQuery('');
        onBlur();
        setResults(null);
        setError(null);
    }

    return (
        <Form className={styles.Form} onSubmit={onSubmit}>
            <InputGroup style={{flexWrap: 'nowrap'}}>
                <Form.Control
                ref={self}
                onFocus={onFocus}
                onBlur={!query ? onBlur : undefined}
                isValid={results?.length}
                isInvalid={error}
                value={query}
                placeholder="Escribí aquí para buscar un tema" 
                onChange={(event) => setQuery(event.target.value)}
                tabIndex={-1}/>
                <InputGroup.Append>
                    <Button variant="outline-secondary" aria-label="Cancelar búsqueda" onClick={onCancel} tabIndex={-1}>x</Button>
                </InputGroup.Append>
            </InputGroup>
        </Form>
    )
}

export default Finder;