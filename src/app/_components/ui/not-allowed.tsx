import Button from './button';
import { signIn } from '@/server/auth';

export default async function NotAllowed() {
  return (
    <div className="flex flex-col gap-4">
      <p>You need to be logged in to access this page.</p>
      <Button name="Login" onClick={() => signIn('discord')} className="mx-auto w-fit px-4 font-semibold uppercase">
        Login
      </Button>
    </div>
  );
}
