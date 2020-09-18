import React from 'react';
import { Router, Route } from 'react-router-dom'
import { createMemoryHistory } from 'history'
import { render, waitFor, screen, cleanup } from '@testing-library/react'
import '@testing-library/jest-dom';
import '@testing-library/jest-dom/extend-expect';
import Home from '../Home';
import { Book } from '../Types';

afterAll(cleanup);

global.fetch = jest.fn<any, any>(() => {
    return Promise.resolve({
        json: () => Promise.resolve([{
            titulo: "Titulo del libro",
            descripcion: "Descripción del libro",
            id: "asdfareffe2243g455"
        }] as Book[])
    });
});

it('renders books correctly', async () => {

    // const history = createMemoryHistory();
    
    // render(
    //     <Router history={history}>
    //         <Route exact path="/" component={Home}/>
    //     </Router>
    // );

    // return waitFor(() => screen.getByTestId('book'));

});