"use client"
import { useRouter } from "next/navigation";

const BackButton = () => {
  const router = useRouter();

  return (
    <button className="text-black font-bold hover:underline text-center" onClick={() => router.back()}>
      &lt; Back
    </button>
  );
};

export default BackButton;