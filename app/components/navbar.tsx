import Link from "next/link";
import Search from "./search";
export default function Navbar() {
  return (
    <nav className="bg-slate-600 p-4 flex justify-between flex-col gap-3 md:flex-row sticky top-0 drop-shadow-xl text-white">
      <h1 className="text-3xl font-bold text-white grid place-content-center ">
        <Link href="/">WikiRocket!</Link>
      </h1>
      <Search/>
    </nav>
  );
}
