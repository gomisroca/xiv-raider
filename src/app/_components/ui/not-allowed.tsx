import LoginButton from './login-button';

export default async function NotAllowed() {
  return (
    <div className="flex flex-col gap-4">
      <p>You need to be logged in to access this page.</p>
      <LoginButton />
    </div>
  );
}
