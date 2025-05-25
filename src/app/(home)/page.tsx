import Link from "next/link";
import Navbar from "./navbar";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <div className="fixed top-0 left-0 right-0 z-10 h-16 bg-white px-4 py-1">
        <Navbar />
      </div>
      <div className="mt-16">
        <p>Hello world</p>
        <Link href={"documents/123"} >Document id page</Link>
      </div>
    </div>
  );
}
