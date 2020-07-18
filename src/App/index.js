import React, { useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import styles from './styles.module.scss';
import Home from '../Home';
import Viewer from '../Viewer';
import Content from '../Content';
import Evaluation from '../Evaluation';
import Editor from '../Editor';
import _book from '../book2.json';

//Agregar algoritmo tf-idf

const App = () => {

  const [book, setBook] = useState(_book);

  return (
    <Router>
      <div className={styles.App}>
        <Switch>
          {/* <Route exact path="/" children={() => <Home setBook={setBook}/>}/> */}
          <Route exact path="/" children={() => <Viewer book={book}/>}/>
          <Route exact path="/contenido/:id" children={() => <Content book={book}/>}/>
          <Route path="/contenido/:id/evaluation" children={() => <Evaluation book={book}/>}/>
          {/* <Route path="/editor" children={() => <Editor />}/> */}
        </Switch>
      </div>
    </Router>
  );
}

export default App;