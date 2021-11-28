import { render, screen, cleanup } from '@testing-library/react';
import { ColumnsContainer } from '../ColumnsContainer';
// import apiAxios from 'src/utils/apiAxios';
// import AxiosMock from 'axios';
import { rest } from 'msw';
import { setupServer } from 'msw/node';

const columnsResponse = rest.get(
  'https://plotter-task.herokuapp.com/columns',
  (req, res, ctx) => {
    return res(
      ctx.json([
        { name: 'Product', function: 'dimension' },
        { name: 'Cost', function: 'measure' },
      ])
    );
  }
);

const handlers = [columnsResponse];

const server = new setupServer(...handlers);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe('columns container', () => {
  test('it should render with header columns', async () => {
    render(<ColumnsContainer />);

    const containerElement = await screen.findByText(/columns/i);
    expect(containerElement).toBeInTheDocument();
  });
  test('it should render with Product column on screen', async () => {
    render(<ColumnsContainer />);

    const containerElement = await screen.findByText(/Product/i);
    expect(containerElement).toBeInTheDocument();
  });
  test('it should render with 2 colums only', async () => {
    render(<ColumnsContainer />);

    const elements = await screen.findAllByTestId(/column-/i);
    expect(elements.length).toBe(2);
  });
});
