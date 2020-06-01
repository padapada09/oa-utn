import React, { useEffect, useState, useMemo } from 'react';
import { useHistory } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import Navbar from '../Navbar';
import LoadingScreen from '../LoadingScreen';
import Block from '../Block';
import styles from './styles.module.scss';
import useBlocks from './useBlocks';
import getComponentAmount from './getComponentAmount';
import scrollIntoView from 'scroll-into-view';

const Viewer = ({book}) => {

    const history = useHistory();
    const blocks = useBlocks(book);
    const [loaded_components, setLoadedComponents] = useState(0);
    const number_of_components = useMemo(() => getComponentAmount(blocks),[blocks]);

    useEffect(() => {
        if (!book) history.goBack();
    },[book,history]);

    useEffect(() => {
        window.onkeydown = (event) => {
            if (event.keyCode === 9) {
                setTimeout(() => scrollIntoView(document.activeElement, { time: 10 }),10);
            }
        }
    },[]);

    return (
        <>
            <Navbar blocks={blocks}/>
            <Container className={styles.Container}>
                {blocks.map((block,index) => <Block key={index} block={block} onLoad={() => setLoadedComponents((prev) => prev + 1)}/> )}
            </Container>
            { !blocks.length && <LoadingScreen message={"Cargando el libro"} />}
            { (blocks.length && loaded_components < number_of_components) && <LoadingScreen message={`Cargando ${Math.floor((loaded_components/number_of_components)*100)}%`} />}
        </>
    )
}

export default Viewer;