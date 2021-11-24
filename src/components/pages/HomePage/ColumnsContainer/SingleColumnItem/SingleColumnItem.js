import ErrorBoundry from 'src/components/ErrorBounderies/ErrorBoundary';

export const SingleColumnItem = ({ item }) => {
  return (
    <ErrorBoundry>
      <span style={{ marginBottom: '10px' }}>{item.name || ''}</span>
    </ErrorBoundry>
  );
};
