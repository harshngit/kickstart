import Link from "next/link";
import Footer from "@/components/Layout/Footer";
import NavbarCustom from "@/components/Layout/NavbarBrandStory";


export default function NotFound() {
  return (
    <div className="font-onest overflow-hidden">
      <NavbarCustom />
      <main className="min-h-[70vh] flex items-center justify-center px-6 py-24 text-center">
        <div className="max-w-xl">
          <h1 className="text-4xl md:text-5xl font-semibold text-[#141414]">Page not found</h1>
          <p className="mt-4 text-gray-600">
            The page you’re looking for doesn’t exist or may have been moved.
          </p>
          <div className="mt-8 flex items-center justify-center gap-4">
            <Link href="/" className="inline-block rounded-full bg-primary text-white px-6 py-3">
              Go to Home
            </Link>
            <Link
              href="/products"
              className="inline-block rounded-full border border-gray-300 px-6 py-3 text-[#141414] hover:border-[#1666B6] hover:text-[#1666B6]"
            >
              Browse Products
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}


