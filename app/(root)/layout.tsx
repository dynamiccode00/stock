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

  if (userId == 'user_2ZFkhqgvmyN8kO9H7HyhS8FRYIN' && store) {
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