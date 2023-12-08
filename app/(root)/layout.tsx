import { redirect } from 'next/navigation';
import { auth } from '@clerk/nextjs';

import prismadb from '@/lib/prismadb';

export default async function SetupLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { userId,user } = auth();

  if (!userId) {
    redirect('/sign-in');
  }

  const store = await prismadb.store.findFirst({
    where: {
      userId,
    }
  });

  if (user?.username == 'seller' && store) {
    redirect(`/${store?.id}/seller`);
  };
  if (user?.username == 'admin' && store) {
    redirect(`/${store?.id}`);
  };

  return (
    <>
      {children}
    </>
  );
};
