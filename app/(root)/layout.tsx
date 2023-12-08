import { redirect } from 'next/navigation';
import { auth } from '@clerk/nextjs';

import prismadb from '@/lib/prismadb';

export default async function SetupLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { userId } = auth();

  if (!userId) {
    redirect('/sign-in');
  }

  const store = await prismadb.store.findFirst();

  if (store) {
    if (userId == 'user_2ZFkhqgvmyN8kO9H7HyhS8FRYIN') {
      redirect(`/${store.id}/seller`);
    }else{
      redirect(`/${store.id}`);
    }
  };

  return (
    <>
      {children}
    </>
  );
};