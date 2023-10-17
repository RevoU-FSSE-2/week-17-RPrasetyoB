import { render, screen, waitFor } from '@testing-library/react';
import ProfilePage from './';
import fetchMock from 'jest-fetch-mock';

jest.mock('../../hook', () => ({
  useAuthChecker: jest.fn(),
}));

fetchMock.enableMocks();

describe('ProfilePage Component', () => {
  beforeEach(() => {
    fetchMock.resetMocks();
  });

  it('renders loading state', () => {
    render(<ProfilePage />);
    expect(screen.getByText('Loading...')).toBeDefined();
  });

  it('renders profile data', async () => {
    fetchMock.mockResponseOnce(
      JSON.stringify({
        data: {
          id: '123',
          name: 'John Doe',
          email: 'john@example.com',
        },
      })
    );

    render(<ProfilePage />);
    
    await waitFor(() => {
      expect(screen.getByText('Logged in as')).toBeDefined();
      expect(screen.getByText('ID')).toBeDefined();
      expect(screen.getByText('Name')).toBeDefined();
      expect(screen.getByText('Email')).toBeDefined();
      expect(screen.getByText('123')).toBeDefined();
      expect(screen.getByText('John Doe')).toBeDefined();
      expect(screen.getByText('john@example.com')).toBeDefined();
      expect(screen.getByText('Back to Home')).toBeDefined();
    });
  });

  it('handles no profile data', async () => {
    fetchMock.mockResponseOnce(
      JSON.stringify({
        data: null,
      })
    );
    render(<ProfilePage />);
    
    await waitFor(() => {
      expect(screen.getByText('No profile data available.')).toBeDefined();
    });
  });
});
