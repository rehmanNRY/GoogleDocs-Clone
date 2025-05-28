"use client"
import { useQuery } from "convex/react";
import Navbar from "./navbar";
import TemplatesGallery from "./templates-gallery";
import { api } from "../../../convex/_generated/api";
import Link from "next/link";

export default function Home() {
  const documents = useQuery(api.documents.get);
  return (
    <div className="min-h-screen flex flex-col">
      <div className="fixed top-0 left-0 right-0 z-10 h-16 bg-white px-4 py-1">
        <Navbar />
      </div>
      <div className="mt-16">
        <TemplatesGallery />
        {documents?.map((doc)=> (
          <span key={doc._id}>{doc.title}</span>
        ))}
        <p className="text-center pt-8"><Link href={"/documents/new"} className="text-blue-600">Click here</Link> to go to documents page</p>
      </div>
    </div>
  );
}
