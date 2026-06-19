
import { render, screen, fireEvent } from '@testing-library/react';
import { UserAuthForm } from './UserAuthForm';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useGuest } from '@/app/guest-provider';

// Mock next-auth/react
jest.mock('next-auth/react', () => ({
  signIn: jest.fn(),
}));

// Mock next/navigation
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(() => ({ push: jest.fn() })),
}));

// Mock @/app/guest-provider
jest.mock('@/app/guest-provider', () => ({
  useGuest: jest.fn(() => ({ setIsGuest: jest.fn() })),
}));

// Mock EmailForm and PhoneForm
jest.mock('./EmailForm', () => ({
    EmailForm: () => <div>Email Form</div>,
}));
jest.mock('./PhoneForm', () => ({
    PhoneForm: () => <div>Phone Form</div>,
}));

describe('UserAuthForm', () => {
  beforeEach(() => {
    (signIn as jest.Mock).mockClear();
    const push = jest.fn();
    (useRouter as jest.Mock).mockImplementation(() => ({ push }));
    const setIsGuest = jest.fn();
    (useGuest as jest.Mock).mockImplementation(() => ({ setIsGuest }));
  });

  it('should render email form by default', () => {
    render(<UserAuthForm />);
    expect(screen.getByText('Email Form')).toBeInTheDocument();
  });

  it('should switch to phone form when Mobile OTP is clicked', () => {
    render(<UserAuthForm />);
    fireEvent.click(screen.getByText('Mobile OTP'));
    expect(screen.getByText('Phone Form')).toBeInTheDocument();
  });

  it('should call setIsGuest and router.push when "Continue as Guest" is clicked', () => {
    const { setIsGuest } = useGuest();
    const { push } = useRouter();

    render(<UserAuthForm />);
    fireEvent.click(screen.getByText('Continue as Guest'));

    expect(setIsGuest).toHaveBeenCalledWith(true);
    expect(push).toHaveBeenCalledWith('/');
  });

  it('should call signIn with "google" when Google button is clicked', () => {
    render(<UserAuthForm />);
    const googleButtons = screen.getAllByText('Google');
    fireEvent.click(googleButtons[0]);
    expect(signIn).toHaveBeenCalledWith('google');
  });

  it('should call signIn with "github" when Github button is clicked', () => {
    render(<UserAuthForm />);
    const githubButtons = screen.getAllByText('Github');
    fireEvent.click(githubButtons[0]);
    expect(signIn).toHaveBeenCalledWith('github');
  });
});
