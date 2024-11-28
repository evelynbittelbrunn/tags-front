import { render } from '@testing-library/react';
import TimeAgo from './TimeAgo';

jest.mock('date-fns', () => ({
  formatDistanceToNow: jest.fn(() => ''), // Mock retornando string vazia
}));

jest.mock('date-fns/locale', () => ({
  ptBR: {},
}));

describe('TimeAgo Component', () => {
  it('renders without crashing', () => {
    const { container } = render(<TimeAgo createdAt="2023-01-01T00:00:00Z" />);
    expect(container).toBeTruthy(); // Valida que algo foi renderizado
  });
});
