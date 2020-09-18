import React from 'react';
import App from '../App';
import '@testing-library/jest-dom';
import '@testing-library/jest-dom/extend-expect';
import { render, waitFor, screen, cleanup } from '@testing-library/react';
import { Book } from '../Types';

afterAll(cleanup);

global.fetch = jest.fn<any, any>(() => {
  return Promise.resolve({
      json: () => Promise.resolve([{
          titulo: "Titulo del contenido",
          descripcion: "Descripción del contenido",
          id: "asdfareffe2243g455"
      }] as Book[])
  });
});

it('renders App without crashing', async () => {
  // render(<App />);

  // await waitFor(() => screen.getByTestId("container"));
});