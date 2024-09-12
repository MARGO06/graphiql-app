'use client';
import { useAuth } from '@/hooks/useAuth';
import { useRouter } from 'next/navigation';

export default function SingOut() {
  const { updateToken, logout } = useAuth();
  const router = useRouter();

  router.replace('/');
  updateToken('');
  logout();
}
