import React, { useState, useEffect } from 'react';
import { Container } from 'react-bootstrap';
import styles from './styles.module.scss';
import Navbar from '../Navbar';
import Block from '../Block';
import Home from '../Home';
import LoadingScreen from '../LoadingScreen';
import useBlocks from './useBlocks';

//Agregar algoritmo tf-idf

const App = () => {

  const [book, setBook] = useState(null);
  const blocks = useBlocks(book);
  const [loaded_blocks, setLoadedBlocks] = useState(0);

  useEffect(() => () => setLoadedBlocks(0),[book]);

  useEffect(() => {
    window.onpopstate = (event) => (event.state.page === 'file_selection') && setBook(null);
  },[]);

  if (!book) return <Home setBook={setBook}/>;

  return (
    <div className={styles.App}>
      <Navbar blocks={blocks}/>
      <Container className={styles.Container}>
        {blocks.map((block,index) => <Block key={index} block={block} onLoad={() => setLoadedBlocks(previous => previous + 1)}/> )}
      </Container>
      { loaded_blocks < book.length ? <LoadingScreen message={`Estamos optimizando el documento...${blocks.length ? Math.floor((loaded_blocks/blocks.length)*100) : '0'}%`} /> : null}
    </div>
  );
}

export default App;