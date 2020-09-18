import React from 'react';
import { Router, Route } from 'react-router-dom'
import { createMemoryHistory } from 'history'
import { render, waitFor, screen, cleanup } from '@testing-library/react'
import '@testing-library/jest-dom';
import '@testing-library/jest-dom/extend-expect';
import Book from '../Book';
import { Content } from '../Types';

afterAll(cleanup);

global.fetch = jest.fn<any, any>(() => {
    return Promise.resolve({
        json: () => Promise.resolve([{
            titulo: "Titulo del contenido",
            descripcion: "Descripción del contenido",
            id: "asdfareffe2243g455"
        }] as Content[])
    });
});

it('renders contents correctly', async () => {

    // const history = createMemoryHistory();
    // history.push("81a63c60-f230-4fd1-84f2-6db9adbb3084");
    
    // render(
    //     <Router history={history}>
    //         <Route exact path="/:book_id" component={Book}/>
    //     </Router>
    // );

    // return waitFor(() => screen.getByTestId('content'));

});