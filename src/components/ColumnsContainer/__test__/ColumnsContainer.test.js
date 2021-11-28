import ReactTestUtils from 'react-dom/test-utils';
import { render, screen, fireEvent } from '@testing-library/react';
import { ColumnsContainer } from '../ColumnsContainer';

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
  //   test('it should render with 2 colums only', async () => {
  //     render(<ColumnsContainer />);

  //     const item = await screen.findByText(/Product/i);

  //     ReactTestUtils.Simulate.dragStart(item, {
  //       dataTransfer: { item_function: 'Product', item_name: 'dimension' },
  //     });

  //     //  fireEvent.dragStart(await screen.findByText(/Product/i), {
  //     //    dataTransfer: { item_function: 'Product', item_name: 'dimension' },
  //     //  });
  //     const elements = await screen.findAllByTestId(/column-/i);
  //     expect(elements.length).toBe(1);
  //   });
});

// var CONTAINER_TYPE = 'custom_container_type';
// it('should set the data transfer with the correct type and the items to being dragged', function () {
//   var container = TestUtils.renderIntoDocument(
//       <Container itemTemplate={CustomTemplate} items={randomWords} />
//     ),
//     item = getItemFromContainer(container, 0),
//     mockDataTransfer = { setData: };
//   TestUtils.Simulate.dragStart(item, { dataTransfer: mockDataTransfer });
//   expect(mockDataTransfer.setData).toBeCalledWith(CONTAINER_TYPE, '["apple"]');
// });
