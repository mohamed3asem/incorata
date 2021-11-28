import { render, screen } from '@testing-library/react';
import { SingleColumnItem } from '../SingleColumnItem';

describe('sinlge column Item', () => {
  test('it should render the same column name passed to it', async () => {
    render(
      <SingleColumnItem item={{ name: 'product', function: 'dimension' }} />
    );
    const headingElement = screen.getByText(/product/i);

    expect(headingElement).toBeInTheDocument();
  });
});
