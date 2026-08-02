import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Verify } from '../pages/Verify';

const createTestQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });

const renderVerify = (search = '') => {
  // Set up URL search params for the component
  Object.defineProperty(window, 'location', {
    writable: true,
    value: { search, pathname: '/verify', href: 'http://localhost/verify' },
  });
  const queryClient = createTestQueryClient();
  return render(
    <QueryClientProvider client={queryClient}>
      <HelmetProvider>
        <MemoryRouter initialEntries={['/verify' + search]}>
          <Verify />
        </MemoryRouter>
      </HelmetProvider>
    </QueryClientProvider>
  );
};

describe('Verify page', () => {
  it('renders the search input with maxLength of 20', () => {
    renderVerify();
    const input = screen.getByPlaceholderText('e.g. VV-ASH-2026-001');
    expect(input).toHaveAttribute('maxLength', '20');
  });

  it('shows error for unknown batch code after search', async () => {
    renderVerify();
    const input = screen.getByPlaceholderText('e.g. VV-ASH-2026-001');
    fireEvent.change(input, { target: { value: 'VV-FAKE-9999-999' } });
    const btn = screen.getAllByRole('button', { name: /verify/i }).find(el => el.getAttribute('type') === 'submit')!;
    fireEvent.click(btn);
    await waitFor(() =>
      expect(screen.getByText(/batch code not found/i)).toBeInTheDocument(),
      { timeout: 4000 }
    );
  });

  it('shows report for known batch code VV-ASH-2026-001', async () => {
    renderVerify();
    const input = screen.getByPlaceholderText('e.g. VV-ASH-2026-001');
    fireEvent.change(input, { target: { value: 'VV-ASH-2026-001' } });
    const btn = screen.getAllByRole('button', { name: /verify/i }).find(el => el.getAttribute('type') === 'submit')!;
    fireEvent.click(btn);
    await waitFor(() =>
      expect(screen.getByText(/certificate of analysis/i)).toBeInTheDocument(),
      { timeout: 4000 }
    );
  });
});
