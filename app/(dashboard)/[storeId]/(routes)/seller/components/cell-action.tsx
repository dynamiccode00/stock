"use client";

import axios from "axios";
import { Copy, Edit, MoreHorizontal, Trash } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-hot-toast";

import { AlertModal } from "@/components/modals/alert-modal";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { ProductColumn } from "./columns";
import prismadb from "@/lib/prismadb";

interface CellActionProps {
  data: ProductColumn;
}

export const CellAction: React.FC<CellActionProps> = ({ data }) => {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const params = useParams();

  const onConfirm = async () => {
    try {
      setLoading(true);
      await axios.delete(`/api/${params.storeId}/products/${data.id}`);
      toast.success("Product deleted.");
      router.refresh();
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
      setOpen(false);
    }
  };
  
  const onSell = async (formData: FormData) => {
    "use server";
    try {
      setLoading(true)
      await prismadb.sell.create({
        data: {
          storeId: params.storeId,
          sellItems:{
            create:{
              product: {
                connect: {
                  id: data.id
                }
              }
            }
          }
        }
      })
      toast.success("SOLD");
    } catch (error) {
      console.log('====================================');
      console.log(error);
      console.log('====================================');
      toast.success("Something Went Wrong");
    } finally{
      setLoading(false)
    }

  }

  return (
    <>
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={onConfirm}
        loading={loading}
      />
      <form action={onSell}>
        <input type="text" name="id" value={data.id} className="hidden"/>
        <Button type="submit" disabled={loading}>sell</Button>
      </form>
    </>
  );
};
