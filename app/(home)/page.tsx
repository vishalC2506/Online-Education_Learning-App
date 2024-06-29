import { UserButton } from "@clerk/nextjs";
import Image from "next/image";

export default function Home() {
  return (
    <div>main
      <UserButton afterSignOutUrl="/sign-in"/>
    </div>
  );
}
