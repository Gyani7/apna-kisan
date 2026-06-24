
"use client"
import dynamic from "next/dynamic";

const AiAssistantPage = dynamic(() => import("../../../components/AiAssistantPage"), { ssr: false });

export default function AiAssistantClientPage() {
    return <AiAssistantPage />;
}
