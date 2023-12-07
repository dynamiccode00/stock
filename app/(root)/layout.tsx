import { redirect, } from 'next/navigation';
import { auth } from '@clerk/nextjs';

import prismadb from '@/lib/prismadb';
import { revalidatePath } from 'next/cache';

export const revalidate = 1

export default async function SetupLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { userId } = auth();

  if (!userId) {
    redirect('/sign-in');
  }

  const store = await prismadb.store.findFirst({
    where: {
      userId,
    }
  });

  if (store) {
    revalidatePath('/')
    redirect(`/${store.id}`);
  };

  return (
    <>
      {children}
    </>
  );
};
