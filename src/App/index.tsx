import React from 'react';
import { BrowserRouter, Switch, Route } from "react-router-dom";
// import Container from '@material-ui/core/Container';
// import styles from './App.module.scss';
import Book from 'Book';
import BookEditor from 'BookEditor';
import Home from 'Home';
import HomeEditor from 'HomeEditor';
import Content from 'Content';
import ContentEditor from 'ContentEditor';
// import Revision from 'Revision';
import NoRevision from 'NoRevision';
import Result from 'Result';
import RevisionEditor from 'RevisionEditor';

const App = () => {

  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Home}/>
        <Route exact path="/editor" component={HomeEditor}/>
        <Route exact path="/:book_id" component={Book}/>
        <Route exact path="/:book_id/editor" component={BookEditor}/>
        <Route exact path="/:book_id/:content_id" component={Content}/>
        <Route exact path="/:book_id/:content_id/editor" component={ContentEditor}/>
        {/* <Route exact path="/:book_id/:content_id/revision" component={Revision}/> */}
        <Route exact path="/:book_id/:content_id/revision/editor" component={RevisionEditor}/>
        <Route exact path="/:book_id/:content_id/revision/result/:score" component={Result}/>
        <Route exact path="/:book_id/:content_id/revision/no_revision" component={NoRevision}/>
      </Switch>
    </BrowserRouter>
  );
}

export default App;