import { useEffect, useMemo, useState } from 'react';
import Card from '@/components/Card';
import Input from '@/components/Input';
import Button from '@/components/Button';
import Alert from '@/components/Alert';
import Spinner from '@/components/Spinner';
import { useLazyGetReposQuery } from '@/services/githubServices';
import { useGetProfileQuery } from '@/services/profileServices';

export default function GithubView() {
  const [username, setUsername] = useState('');
  const [trigger, { data, isFetching, error }] = useLazyGetReposQuery();
  const { data: profile, refetch: refetchProfile } = useGetProfileQuery(
    undefined,
    { refetchOnMountOrArgChange: true }
  );

  const defaultUsername = useMemo(() => {
    if (profile?.githubUsername && profile.githubUsername.trim().length > 0) {
      return profile.githubUsername.trim();
    }
    try {
      const token =
        typeof window !== 'undefined' ? localStorage.getItem('token') : null;
      if (!token) return '';
      const [, payloadB64] = token.split('.');
      if (!payloadB64) return '';
      const json = JSON.parse(atob(payloadB64));
      const email = typeof json?.email === 'string' ? json.email : '';
      if (!email) return '';
      return email;
    } catch {
      return '';
    }
  }, [profile?.githubUsername]);

  useEffect(() => {
    if (defaultUsername && !username) {
      setUsername(defaultUsername);
      trigger(defaultUsername);
    }
  }, [defaultUsername]);

  // Ensure profile used for default username is fresh when mounting
  useEffect(() => {
    refetchProfile();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const search = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!username) return;
    await trigger(username);
  };

  return (
    <div className="mx-auto max-w-3xl py-6 space-y-4">
      <Card title="GitHub Repos">
        <form onSubmit={search} className="flex flex-col gap-3 sm:flex-row">
          <Input
            className="flex-1"
            placeholder="Enter GitHub username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <Button type="submit" isLoading={isFetching}>
            Search
          </Button>
        </form>
      </Card>

      {error && <Alert variant="error">Failed to fetch repositories</Alert>}

      <Card>
        {isFetching && (
          <div className="flex items-center justify-center py-8">
            <Spinner className="h-6 w-6 border-gray-600" />
          </div>
        )}
        {!isFetching && data && data.length === 0 && (
          <div className="py-4 text-sm text-gray-600">
            No repositories found.
          </div>
        )}
        {!isFetching && data && data.length > 0 && (
          <ul className="divide-y divide-gray-100">
            {data.map((repo) => (
              <li key={repo.id} className="py-3">
                <div className="flex items-center justify-between">
                  <div>
                    <a
                      href={repo.html_url}
                      target="_blank"
                      rel="noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      {repo.name}
                    </a>
                    {repo.description && (
                      <p className="text-sm text-gray-600">
                        {repo.description}
                      </p>
                    )}
                  </div>
                  {typeof repo.stargazers_count === 'number' && (
                    <span className="ml-4 rounded bg-yellow-50 px-2 py-1 text-xs text-yellow-800">
                      ★ {repo.stargazers_count}
                    </span>
                  )}
                </div>
              </li>
            ))}
          </ul>
        )}
      </Card>
    </div>
  );
}
