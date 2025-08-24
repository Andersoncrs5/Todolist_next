import { useParams } from "next/navigation";

export default function UpdateTask() {
    const { id } = useParams<{id: string}>()
}