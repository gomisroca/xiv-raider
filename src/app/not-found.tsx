import Link from './_components/ui/link';
import { Title } from './_components/ui/title';

export default function NotFound() {
  return (
    <div className="flex w-full flex-col items-center justify-center gap-2">
      <Title content="404 | Not Found" size="large" />
      <p>We could not find the page you are looking for.</p>
      <Link href="/" name="Home" className="w-fit font-semibold uppercase">
        Go Back
      </Link>
    </div>
  );
}
