import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Track from './Track';

describe('Track Component', () => {
  const track = {
    id: 1,
    name: 'Song 1',
    artist: 'Artist 1',
    album: 'Album 1'
  };

  test('renders track information correctly', () => {
    const { getByText } = render(<Track track={track} />);
    expect(getByText('Song 1')).toBeInTheDocument();
    expect(getByText('Artist 1 | Album 1')).toBeInTheDocument();
  });

  test('calls onAdd when add button is clicked', () => {
    const onAdd = jest.fn();
    const { getByText } = render(<Track track={track} onAdd={onAdd} isRemoval={false} />);
    fireEvent.click(getByText('+'));
    expect(onAdd).toHaveBeenCalledWith(track);
  });

  test('calls onRemove when remove button is clicked', () => {
    const onRemove = jest.fn();
    const { getByText } = render(<Track track={track} onRemove={onRemove} isRemoval={true} />);
    fireEvent.click(getByText('-'));
    expect(onRemove).toHaveBeenCalledWith(track);
  });
});
