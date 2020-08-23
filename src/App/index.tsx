import React from 'react';
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Container from '@material-ui/core/Container';
import styles from './App.module.scss';
import Book from 'Book';
import Home from 'Home';
import Content from 'Content';
import Revision from 'Revision';
import NoRevision from 'NoRevision';
import Result from 'Result';

const App = () => {

  return (
    <BrowserRouter>
      <Container maxWidth="sm" className={styles.App} data-testid="container">
        <Switch>
          <Route exact path="/" component={Home}/>
          <Route exact path="/:book_id" component={Book}/>
          <Route exact path="/:book_id/:content_id" component={Content}/>
          <Route exact path="/:book_id/:content_id/revision" component={Revision}/>
          <Route exact path="/:book_id/:content_id/revision/result/:score" component={Result}/>
          <Route exact path="/:book_id/:content_id/revision/no_revision" component={NoRevision}/>
        </Switch>
      </Container>
    </BrowserRouter>
  );
}

export default App;