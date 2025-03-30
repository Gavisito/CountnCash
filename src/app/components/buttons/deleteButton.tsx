
"use client";
import { useRouter } from "next/navigation";
import { TrashIcon } from "@heroicons/react/24/outline";

interface DeleteButtonProps {
    expenseId: number;
  }

export default function DeleteButton({expenseId}: DeleteButtonProps) {
    //used to go to another page for refresh purposes
    const router = useRouter();

    // delete function based on url expense id
    const handleDelete = async () => {
      try {
        //const baseUrl = process.env.NEXT_PUBLIC_APP_URL || '';
        const response = await fetch(`/api/expenses/${expenseId}`, {method: "DELETE",});
  
        if (!response.ok) {
          throw new Error(`Failed to delete expense: ${response.status}`);
        }
  
        // Navigate back to the expense list page after successful deletion
        router.push("/dashboard/expenses");
        router.refresh();
      } catch (err) {
        console.error("Error deleting course:", err);
      }
    };
    return (
        <button className="w-8 w-8 hover:cursor-pointer" onClick={handleDelete}>
            <TrashIcon/>
        </button>
    );
}
