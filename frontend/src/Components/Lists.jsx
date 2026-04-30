import { BarChart3Icon, User } from 'lucide-react';
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

function Lists() {
  const location = useLocation();
  const navBar = [
    { id: 1, name: 'Projects', link: '/Dashboard' },
    { id: 2, name: 'Teams', link: '/Teams' },
    { id: 3, name: 'Reports', link: '/Report' },
    { id: 4, name: 'Chats', link: '/Chats' },
  ];

  const [notification, setNotification] = useState(false);
  const [profile, setProfile] = useState(false);
  const [settings, setSettings] = useState(false);

  return (
    <header className='fixed left-0 top-0 z-50 w-full border-b border-slate-200 bg-white/95 backdrop-blur-xl shadow-sm'>
      <div className='mx-auto flex max-w-7xl items-center justify-between px-6 py-4'>
        <div className='flex items-center gap-3'>
          <div className='flex h-11 w-11 items-center justify-center rounded-3xl bg-gradient-to-tr from-cyan-500 via-cyan-500 to-cyan-700 text-white shadow-lg'>
            <BarChart3Icon size={20} />
          </div>
          <div>
            <p className='text-sm font-semibold uppercase tracking-[0.24em] text-slate-500'>ProjectHub</p>
            <p className='text-xl font-semibold text-slate-900'>Dashboard</p>
          </div>
        </div>

        <nav>
          <ul className='flex items-center gap-8 text-sm font-medium text-slate-600'>
            {navBar.map(item => (
              <li key={item.id}>
                <Link
                  to={item.link}
                  className={`transition hover:text-cyan-600 ${location.pathname === item.link ? 'text-cyan-600' : ''}`}
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className='flex items-center gap-4'>
          <button
            type='button'
            className='inline-flex items-center gap-2 rounded-full bg-slate-100 px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-200'
            onClick={() => setProfile(true)}
            onMouseLeave={() => setProfile(false)}
          >
            <div className='flex h-8 w-8 items-center justify-center rounded-full bg-cyan-600 text-white'>
              <User size={16} />
            </div>
            Profile
          </button>

          <button
            type='button'
            className='rounded-full p-2 text-slate-600 transition hover:bg-slate-100'
            onClick={() => setSettings(!settings)}
          >
            <img src='/assets/gear-solid-full.svg' alt='Settings' className='h-5 w-5' />
          </button>

          <button
            type='button'
            className='rounded-full p-2 text-slate-600 transition hover:bg-slate-100'
            onClick={() => setNotification(!notification)}
          >
            <img src='/assets/bell-solid-full.svg' alt='Notifications' className='h-5 w-5' />
          </button>
        </div>
      </div>

      {profile && (
        <div className='absolute right-6 top-20 w-56 rounded-3xl border border-slate-200 bg-white p-4 shadow-lg'>
          <p className='font-semibold text-slate-900'>Ana Redwood</p>
          <p className='mt-1 text-sm text-slate-500'>ana@projecthub.com</p>
          <div className='mt-4 rounded-2xl bg-slate-50 p-3 text-sm text-slate-600'>
            Member since 2025
          </div>
        </div>
      )}

      {settings && (
        <div className='absolute right-24 top-20 w-48 rounded-3xl border border-slate-200 bg-white p-4 shadow-lg'>
          <p className='font-semibold text-slate-900'>Settings</p>
          <p className='mt-2 text-sm text-slate-500'>Notifications, preferences, and account info.</p>
        </div>
      )}

      {notification && (
        <div className='absolute right-6 top-20 w-64 rounded-3xl border border-slate-200 bg-white p-4 shadow-lg'>
          <p className='font-semibold text-slate-900'>Notifications</p>
          <p className='mt-2 text-sm text-slate-500'>You have 2 new team updates.</p>
        </div>
      )}
    </header>
  );
}

export default Lists;