import { useState } from 'react';
import Card from '@/components/Card';
import Input from '@/components/Input';
import Button from '@/components/Button';
import Alert from '@/components/Alert';
import { useLoginMutation } from '@/services/authServices';

export default function LoginView({ onLoggedIn }: { onLoggedIn: () => void }) {
  const [email, setEmail] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [login, { isLoading }] = useLoginMutation();

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    try {
      const res = await login({ email }).unwrap();
      if (res?.token) onLoggedIn();
    } catch (err) {
      const maybe = err as { data?: unknown };
      setError(typeof maybe?.data === 'string' ? maybe.data : 'Login failed');
    }
  };

  return (
    <div className="flex w-full items-center justify-center py-10  ">
      <Card className="w-full max-w-sm" title="Sign in">
        <form onSubmit={submit} className="space-y-4">
          {error && <Alert variant="error">{error}</Alert>}
          <Input
            label="Email"
            name="email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
          />
          {null}
          <Button type="submit" isLoading={isLoading} className="w-full">
            Sign in
          </Button>
        </form>
      </Card>
    </div>
  );
}
