import React, { useState } from 'react';
import { Container } from 'react-bootstrap';
import styles from './styles.module.scss';
import Navbar from '../Navbar';
import Block from '../Block';
import LoadingScreen from '../LoadingScreen';
import useBlocks from './useBlocks';
import book from '../MEDICINA.json';

//Agregar algoritmo tf-idf

const App = () => {

  const blocks = useBlocks(book);
  const [loaded_blocks, setLoadedBlocks] = useState(0);

  if (blocks.loading) return <LoadingScreen message="Cargando el libro" />

  return (
    <div className={styles.App}>
      <Navbar blocks={blocks}/>
      <Container className={styles.Container}>
        {blocks.map((block,index) => <Block key={index} block={block} onLoad={() => setLoadedBlocks(previous => previous + 1)}/> )}
      </Container>
      { loaded_blocks < book.length ? <LoadingScreen message="Estamos optimizando el documento..." /> : null}
    </div>
  );
}

export default App;