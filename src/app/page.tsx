import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-amber-100">
      <p>Hello world</p>
      {/* <Button  >CLick me</Button> */}
      <Link href={"documents/123"} >Document id page</Link>
    </div>
  );
}
