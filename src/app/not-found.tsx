import Link from './_components/ui/link';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center gap-2">
      <h2 className="text-4xl font-semibold tracking-widest uppercase">404 | Not Found</h2>
      <p>We could not find the page you are looking for.</p>
      <Link href="/">Return Home</Link>
    </div>
  );
}
