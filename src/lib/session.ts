import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';

export const getSession = () => getServerSession(authOptions);
