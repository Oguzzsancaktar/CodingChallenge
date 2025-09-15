import { useEffect, useState } from 'react';
import Card from '@/components/Card';
import Input from '@/components/Input';
import Button from '@/components/Button';
import Alert from '@/components/Alert';
import Spinner from '@/components/Spinner';
import {
  useGetProfileQuery,
  useUpdateProfileMutation,
} from '@/services/profileServices';
import type { IUpdateProfileRequest } from '@codingchallenge/shared';

export default function ProfileView() {
  const { data, error, isLoading, refetch } = useGetProfileQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });
  const [updateProfile, { isLoading: isSaving }] = useUpdateProfileMutation();
  const [form, setForm] = useState<IUpdateProfileRequest>({ email: '' });
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    if (data)
      setForm({
        email: data.email,
        name: data.name,
        bio: data.bio,
        githubUsername: data.githubUsername,
      });
  }, [data]);

  // Ensure fresh data after auth changes or navigation back to this tab
  useEffect(() => {
    refetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null);
    try {
      await updateProfile(form).unwrap();
      setMessage('Profile updated');
      refetch();
    } catch {
      setMessage('Update failed');
    }
  };

  if (isLoading)
    return (
      <div className="flex items-center justify-center py-10">
        <Spinner className="h-6 w-6 border-gray-600" />
      </div>
    );
  if (error)
    return (
      <div className="py-10 max-w-xl mx-auto">
        <Alert variant="error">Failed to load profile</Alert>
      </div>
    );

  return (
    <div className="mx-auto max-w-xl py-6">
      <Card title="Your Profile">
        {message && (
          <Alert
            className="mb-4"
            variant={message.includes('updated') ? 'success' : 'error'}
          >
            {message}
          </Alert>
        )}
        <form onSubmit={submit} className="space-y-4">
          <Input
            label="Name"
            name="name"
            value={form.name ?? ''}
            onChange={onChange}
            placeholder="Your name"
          />
          <Input
            label="Email"
            name="email"
            type="email"
            required
            value={form.email}
            onChange={onChange}
            placeholder="you@example.com"
          />
          <Input
            label="Bio"
            name="bio"
            value={form.bio ?? ''}
            onChange={onChange}
            placeholder="Short bio"
          />
          <Input
            label="GitHub Username"
            name="githubUsername"
            value={form.githubUsername ?? ''}
            onChange={onChange}
            placeholder="octocat"
          />
          <div className="flex justify-end">
            <Button type="submit" isLoading={isSaving}>
              Save
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
}
