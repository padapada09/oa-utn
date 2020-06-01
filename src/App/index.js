import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import styles from './styles.module.scss';
import Home from '../Home';
import Viewer from '../Viewer';
import Editor from '../Editor';

//Agregar algoritmo tf-idf

const App = () => {

  const [book, setBook] = useState(null);

  return (
    <Router>
      <div className={styles.App}>
        <Switch>
          <Route exact path="/" children={() => <Home setBook={setBook}/>}/>
          <Route path="/view" children={() => <Viewer book={book}/>}/>
          <Route path="/editor" children={() => <Editor />}/>
        </Switch>
      </div>
    </Router>
  );
}

export default App;