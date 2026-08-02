import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { BrowserRouter } from 'react-router-dom';
import SearchModal from '../components/ui/SearchModal';

const renderSearchModal = (isOpen = true, onClose = vi.fn()) => {
  return {
    onClose,
    ...render(
      <BrowserRouter>
        <SearchModal isOpen={isOpen} onClose={onClose} />
      </BrowserRouter>
    ),
  };
};

describe('SearchModal Component', () => {
  it('does not render content when isOpen is false', () => {
    renderSearchModal(false);
    expect(screen.queryByPlaceholderText(/search products/i)).not.toBeInTheDocument();
  });

  it('renders input, popular searches, and quick navigation when open', () => {
    renderSearchModal(true);
    expect(screen.getByPlaceholderText(/search products, lab verification, ingredients/i)).toBeInTheDocument();
    expect(screen.getByText(/popular searches/i)).toBeInTheDocument();
    expect(screen.getByText(/ksm-66® organic ashwagandha/i)).toBeInTheDocument();
  });

  it('filters search results based on user input', () => {
    renderSearchModal(true);
    const input = screen.getByPlaceholderText(/search products, lab verification, ingredients/i);

    fireEvent.change(input, { target: { value: 'verify' } });

    expect(screen.getByText(/search results/i)).toBeInTheDocument();
    expect(screen.getByText(/verify batch & certificate of analysis/i)).toBeInTheDocument();
  });

  it('populates query input when popular tag is clicked', () => {
    renderSearchModal(true);
    const tag = screen.getByRole('button', { name: /^ashwagandha$/i });

    fireEvent.click(tag);

    const input = screen.getByPlaceholderText(/search products, lab verification, ingredients/i) as HTMLInputElement;
    expect(input.value).toBe('Ashwagandha');
    expect(screen.getByText(/search results/i)).toBeInTheDocument();
  });

  it('calls onClose when top right X close button is clicked', () => {
    const onClose = vi.fn();
    renderSearchModal(true, onClose);

    const closeBtn = screen.getByRole('button', { name: /close search/i });
    fireEvent.click(closeBtn);

    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('calls onClose when clicking backdrop outside of modal card', () => {
    const onClose = vi.fn();
    const { container } = renderSearchModal(true, onClose);

    const wrapperDiv = container.firstChild as HTMLElement;
    fireEvent.click(wrapperDiv);

    expect(onClose).toHaveBeenCalledTimes(1);
  });
});
