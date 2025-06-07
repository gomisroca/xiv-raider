import Link from './_components/ui/link';
import { Title } from './_components/ui/title';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <Title content="404 | Not Found" size="large" />
      <p>We could not find the page you are looking for.</p>
      <Link href="/" name="Home" className="mt-4 h-18 w-fit text-4xl font-semibold uppercase">
        Go Back
      </Link>
    </div>
  );
}
