import Link from '@/app/_components/ui/link';

export default async function NotAllowed() {
  return (
    <div className="flex flex-col gap-4">
      <p>You need to be logged in to access this page.</p>
      <Link name="Login" href="/sign-in" className="mx-auto w-fit px-4 font-semibold uppercase">
        Login
      </Link>
    </div>
  );
}
