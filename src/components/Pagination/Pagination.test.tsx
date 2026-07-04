import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Pagination } from './Pagination';

describe('Pagination', () => {
  it('renders the current page as active', () => {
    render(<Pagination page={3} count={5} onChange={() => {}} />);
    expect(screen.getByText('3')).toBeInTheDocument();
  });

  it('calls onChange with the next page when next arrow clicked', async () => {
    const onChange = vi.fn();
    const user = userEvent.setup();
    render(<Pagination page={3} count={5} onChange={onChange} />);
    await user.click(screen.getByText('›'));
    expect(onChange).toHaveBeenCalledWith(4);
  });

  it('calls onChange with the previous page when prev arrow clicked', async () => {
    const onChange = vi.fn();
    const user = userEvent.setup();
    render(<Pagination page={3} count={5} onChange={onChange} />);
    await user.click(screen.getByText('‹'));
    expect(onChange).toHaveBeenCalledWith(2);
  });

  it('disables prev button on first page', () => {
    render(<Pagination page={1} count={5} onChange={() => {}} />);
    expect(screen.getByText('‹')).toBeDisabled();
  });

  it('disables next button on last page', () => {
    render(<Pagination page={5} count={5} onChange={() => {}} />);
    expect(screen.getByText('›')).toBeDisabled();
  });

  it('shows ellipsis for large page counts', () => {
    render(<Pagination page={10} count={20} onChange={() => {}} />);
    expect(screen.getAllByText('…').length).toBeGreaterThan(0);
  });

  it('always shows first and last page', () => {
    render(<Pagination page={10} count={20} onChange={() => {}} />);
    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByText('20')).toBeInTheDocument();
  });

  it('calls onChange when a page number is clicked', async () => {
    const onChange = vi.fn();
    const user = userEvent.setup();
    render(<Pagination page={1} count={5} onChange={onChange} />);
    await user.click(screen.getByText('2'));
    expect(onChange).toHaveBeenCalledWith(2);
  });

  it('shows first/last buttons when showFirstLast is true', () => {
    render(<Pagination page={3} count={10} onChange={() => {}} showFirstLast />);
    expect(screen.getByText('«')).toBeInTheDocument();
    expect(screen.getByText('»')).toBeInTheDocument();
  });
});
