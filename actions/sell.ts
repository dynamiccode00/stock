'use server'

import prismadb from "@/lib/prismadb";

 
export async function myAction(storeId: any,id: any) {
    try {
        await prismadb.sell.create({
          data: {
            storeId: storeId,
            sellItems:{
              create:{
                product: {
                  connect: {
                    id
                  }
                }
              }
            }
          }
        })
        const Oproduct = await prismadb.product.findUnique({
          where: {
            id
          },
        });
        if (Oproduct) {
          await prismadb.product.update({
            where: {
              id
            },
            data: {
              stockQuantity: Oproduct?.stockQuantity - 1
            },
          });
        }
        return 'success'
        
    } catch (error) {
        console.log('====================================');
        console.log('');
        console.log('====================================');
        return 'error'
      }
}