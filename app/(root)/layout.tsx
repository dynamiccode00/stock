import { redirect } from 'next/navigation';

import prismadb from '@/lib/prismadb';
import { auth } from '@clerk/nextjs';

export default async function SetupLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { userId,user } = auth();
  let id = 'user_2YxJdWWmZfzFMbi192obx0KMBbY'

  if (!userId) {
    redirect('/sign-in');
  }

  const store = await prismadb.store.findFirst({
    where: {
      id,
    }
  });

  if (userId == 'user_2Z2My4D98pL0k77nSDIukRdX50R' && store) {
    redirect(`/${store?.id}/seller`);
  };
  if (userId == 'user_2YxJdWWmZfzFMbi192obx0KMBbY' && store) {
    redirect(`/${store?.id}`);
  };

  return (
    <>
      {children}
    </>
  );
};