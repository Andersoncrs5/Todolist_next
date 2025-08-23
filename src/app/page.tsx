'use client'

import Header from "@/components/header.component";
import { Providers } from "./providers";
import Btn from "@/components/buttons/btn.component";
import ListTasks from "@/components/listTask/render.component";
import UseHome from "./service";
import { MdCreate } from "react-icons/md";


export default function Home() {
  
  return (
    <Providers>
      <Header>
        <Btn icon={ <MdCreate /> } title={""} funcClick={() => {alert('OK')}} />
      </Header>
      <main>
        <ListTasks />
      </main>
    </Providers>
  );
}
