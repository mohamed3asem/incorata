import {
  render,
  screen,
  getByTestId,
  createEvent,
  fireEvent,
  waitFor,
} from '@testing-library/react';
import { Box } from '../Box';

describe('sinlge column Item', () => {
  test('it should render box with title dimension', async () => {
    render(
      <Box
        title="dimension"
        changeData={jest.fn()}
        boxFunction="dimension"
        dimension=""
        measures={[]}
      />
    );
    const element = screen.getByText(/dimension/i);

    expect(element).toBeInTheDocument();
  });

  test('it should render box with clear button', async () => {
    render(
      <Box
        title="dimension"
        changeData={jest.fn()}
        boxFunction="dimension"
        dimension=""
        measures={[]}
      />
    );
    const element = screen.getByText(/clear/i);

    expect(element).toBeInTheDocument();
  });

  // test('it should render drop area with title dimension', async () => {
  //   render(
  //     <Box
  //       title="dimension"
  //       changeData={jest.fn()}
  //       boxFunction="dimension"
  //       dimension=""
  //       measures={[]}
  //     />
  //   );

  //   const dropZone = screen.getByTestId(/dropBox/i);

  //   const el = document.createElement('div');
  //   el.setAttribute('id', 'Product');
  //   Box.
  //   // const fileDropEvent = createEvent.drop(dropZone, {
  //   //   dataTransfer: {
  //   //     getData: jest.fn(() => ({
  //   //       item_function: 'dimension',
  //   //       item_name: 'Product',
  //   //     })),
  //   //   },
  //   // });

  //   //  Object.defineProperty(fileDropEvent, 'dataTransfer', {
  //   //    getData: jest.fn(() => {
  //   //      return { item_function: 'Product', item_name: 'dimension' };
  //   //    }),
  //   //  });

  //   // Object.assign(fileDropEvent, {
  //   //   dataTransfer: {
  //   //     getData: () => ({ item_function: 'dimension', item_name: 'Product' }),
  //   //   },
  //   // });

  //   fireEvent.drop(dropZone, {
  //     dataTransfer: {
  //       getData: jest.fn().mockReturnValueOnce({
  //         item_function: 'Product',
  //         item_name: 'dimension',
  //       }),
  //     },
  //   });

  //   const headingElement = screen.getByText(/Product/i);
  //   expect(headingElement).toBeInTheDocument();
  //   // expect(dropZone).toBeInTheDocument();
  //   // await waitFor(() => {
  //   //   const headingElement = screen.getByText(/Product/i);
  //   //   expect(headingElement).toBeInTheDocument();
  //   // });
  // });
});
