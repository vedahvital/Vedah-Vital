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

  it('navigates and closes modal when popular tag is clicked', () => {
    const onClose = vi.fn();
    renderSearchModal(true, onClose);
    const tag = screen.getByRole('button', { name: /^ashwagandha$/i });

    fireEvent.click(tag);

    expect(onClose).toHaveBeenCalledTimes(1);
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

  it('matches multi-word and tokenized search queries effectively', () => {
    renderSearchModal(true);
    const input = screen.getByPlaceholderText(/search products, lab verification, ingredients/i);

    // Multi-word search
    fireEvent.change(input, { target: { value: 'sleep stress' } });
    expect(screen.getByText(/ksm-66® organic ashwagandha/i)).toBeInTheDocument();

    // Partial prefix search
    fireEvent.change(input, { target: { value: 'withan' } });
    expect(screen.getAllByText(/withaferin|withanolides|ashwagandha/i).length).toBeGreaterThan(0);

    // Heavy metals search
    fireEvent.change(input, { target: { value: 'lead mercury' } });
    expect(screen.getByText(/heavy metal & microbial screening/i)).toBeInTheDocument();
  });

  it('filters results by category when category tab is selected', () => {
    renderSearchModal(true);
    const input = screen.getByPlaceholderText(/search products, lab verification, ingredients/i);

    fireEvent.change(input, { target: { value: 'evidence' } });
    
    // Select Science category tab
    const scienceTab = screen.getByRole('button', { name: /^science$/i });
    fireEvent.click(scienceTab);

    expect(screen.getByText(/clinical studies & scientific evidence/i)).toBeInTheDocument();
  });

  it('shows helpful suggestions on query with no matches', () => {
    renderSearchModal(true);
    const input = screen.getByPlaceholderText(/search products, lab verification, ingredients/i);

    fireEvent.change(input, { target: { value: 'xyzunknownterm999' } });
    expect(screen.getByText(/no matching results/i)).toBeInTheDocument();
    expect(screen.getByText(/try one of these suggestions/i)).toBeInTheDocument();
  });
});
