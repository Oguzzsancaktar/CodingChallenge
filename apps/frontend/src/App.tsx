import { useState } from 'react';
import './App.css';
import Button from '@/components/Button';
import Card from '@/components/Card';
import LoginView from '@/views/LoginView';
import ProfileView from '@/views/ProfileView';
import GithubView from '@/views/GithubView';

type TabKey = 'profile' | 'github';

function App() {
  const [isAuthed, setIsAuthed] = useState<boolean>(
    () => !!localStorage.getItem('token')
  );
  const [tab, setTab] = useState<TabKey>('profile');

  const logout = () => {
    localStorage.removeItem('token');
    setIsAuthed(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="border-b bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between p-4">
          <div className="text-lg font-semibold">User Profile Manager</div>
          <div className="flex items-center gap-3 text-sm text-gray-600">
            {isAuthed ? (
              <Button variant="secondary" onClick={logout}>
                Logout
              </Button>
            ) : null}
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl p-4">
        {!isAuthed ? (
          <LoginView onLoggedIn={() => setIsAuthed(true)} />
        ) : (
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-4">
            <aside className="lg:col-span-1">
              <Card>
                <nav className="flex flex-col gap-2">
                  <Button
                    variant={tab === 'profile' ? 'primary' : 'secondary'}
                    onClick={() => setTab('profile')}
                  >
                    Profile
                  </Button>
                  <Button
                    variant={tab === 'github' ? 'primary' : 'secondary'}
                    onClick={() => setTab('github')}
                  >
                    GitHub
                  </Button>
                </nav>
              </Card>
            </aside>
            <section className="lg:col-span-3">
              {tab === 'profile' && <ProfileView />}
              {tab === 'github' && <GithubView />}
            </section>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
