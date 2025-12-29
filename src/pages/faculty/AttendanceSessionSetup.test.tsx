
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import AttendanceSessionSetup from './AttendanceSessionSetup';
import { BATCHES, COURSES } from '../../constants';

const mockNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

const renderComponent = (mode = 'scan') => {
  render(
    <MemoryRouter initialEntries={[{ pathname: '/attendance/setup', state: { mode } }]}>
      <Routes>
        <Route path="/attendance/setup" element={<AttendanceSessionSetup />} />
      </Routes>
    </MemoryRouter>
  );
};

describe('AttendanceSessionSetup', () => {
  beforeEach(() => {
    mockNavigate.mockClear();
  });

  it('should render step 1 correctly', () => {
    renderComponent();
    expect(screen.getByText('STEP 1: Select Batches')).toBeInTheDocument();
    expect(screen.getByText('Select All')).toBeInTheDocument();
    BATCHES.forEach(batch => {
      expect(screen.getByText(batch)).toBeInTheDocument();
    });
    expect(screen.getByText('Proceed')).toBeDisabled();
  });

  it('should select and deselect a batch', () => {
    renderComponent();
    const batchButton = screen.getByText(BATCHES[0]);
    fireEvent.click(batchButton);
    expect(batchButton).toHaveClass('border-primary');
    fireEvent.click(batchButton);
    expect(batchButton).not.toHaveClass('border-primary');
  });

  it('should select all batches', () => {
    renderComponent();
    const selectAllButton = screen.getByText('Select All');
    fireEvent.click(selectAllButton);
    BATCHES.forEach(batch => {
      expect(screen.getByText(batch)).toHaveClass('border-primary');
    });
  });

  it('should enable the proceed button when a batch is selected', () => {
    renderComponent();
    const batchButton = screen.getByText(BATCHES[0]);
    fireEvent.click(batchButton);
    expect(screen.getByText('Proceed')).toBeEnabled();
  });

  it('should move to step 2 when proceed is clicked', () => {
    renderComponent();
    const batchButton = screen.getByText(BATCHES[0]);
    fireEvent.click(batchButton);
    const proceedButton = screen.getByText('Proceed');
    fireEvent.click(proceedButton);
    expect(screen.getByText('STEP 2: Select Course')).toBeInTheDocument();
  });

  it('should render step 2 correctly', () => {
    renderComponent();
    fireEvent.click(screen.getByText(BATCHES[0]));
    fireEvent.click(screen.getByText('Proceed'));
    expect(screen.getByText('Select course...')).toBeInTheDocument();
    expect(screen.getByText(BATCHES[0])).toBeInTheDocument();
  });

  it('should select a course', () => {
    renderComponent();
    fireEvent.click(screen.getByText(BATCHES[0]));
    fireEvent.click(screen.getByText('Proceed'));
    const select = screen.getByRole('combobox');
    fireEvent.change(select, { target: { value: COURSES[0] } });
    expect(select).toHaveValue(COURSES[0]);
  });

  it('should enable the final button when a course is selected', () => {
    renderComponent();
    fireEvent.click(screen.getByText(BATCHES[0]));
    fireEvent.click(screen.getByText('Proceed'));
    const select = screen.getByRole('combobox');
    fireEvent.change(select, { target: { value: COURSES[0] } });
    const proceedButton = screen.getByText('Proceed');
    expect(proceedButton).toBeEnabled();
  });

  it('should navigate to /attendance/scan in scan mode', () => {
    renderComponent('scan');
    fireEvent.click(screen.getByText(BATCHES[0]));
    fireEvent.click(screen.getByText('Proceed'));
    const select = screen.getByRole('combobox');
    fireEvent.change(select, { target: { value: COURSES[0] } });
    const proceedButton = screen.getByText('Proceed');
    fireEvent.click(proceedButton);
    expect(mockNavigate).toHaveBeenCalledWith('/attendance/scan', {
      state: { batches: [BATCHES[0]], course: COURSES[0] },
    });
  });

  it('should navigate to /attendance/manual in manual mode', () => {
    renderComponent('manual');
    fireEvent.click(screen.getByText(BATCHES[0]));
    fireEvent.click(screen.getByText('Proceed'));
    const select = screen.getByRole('combobox');
    fireEvent.change(select, { target: { value: COURSES[0] } });
    const getStudentButton = screen.getByText('Get Student');
    fireEvent.click(getStudentButton);
    expect(mockNavigate).toHaveBeenCalledWith('/attendance/manual', {
      state: { batches: [BATCHES[0]], course: COURSES[0] },
    });
  });
});
