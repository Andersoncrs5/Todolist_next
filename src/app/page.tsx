'use client'

import Header from "@/components/header.component";
import { Providers } from "./providers";
import Btn from "@/components/buttons/btn.component";
import ListTasks from "@/components/listTask/render.component";
import UseHome from "./service";
import { MdCreate } from "react-icons/md";
import { useRouter } from "next/navigation";
import BtnUrl from "@/components/btnUrl/render";


export default function Home() {
  const router = useRouter();

  return (
    <Providers>
      <Header>
        <BtnUrl url={"/create-task"} icon={ <MdCreate /> } bgColor={"bg-transparent"} style={"p-1"} />
      </Header>
      <main>
        <ListTasks />
      </main>
    </Providers>
  );
}
