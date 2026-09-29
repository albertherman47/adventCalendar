import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { ArrowLeft, Search, ShieldCheck, Users, RefreshCw, Save } from 'lucide-react';
import type { User } from '@supabase/supabase-js';
import { supabase } from '../lib/supabase';
import { AccountModal } from './AccountModal';

type AdminUser = { id: string; email?: string; created_at: string; tier: 'free' | 'standard' | 'premium' };

interface AdminPageProps {
  user: User | null;
  language: string;
  onSignedOut: () => void;
}

export const AdminPage: React.FC<AdminPageProps> = ({ user, language, onSignedOut }) => {
  const hu = language === 'hu';
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [drafts, setDrafts] = useState<Record<string, AdminUser['tier']>>({});
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(false);
  const [savingId, setSavingId] = useState<string | null>(null);
  const [error, setError] = useState('');
  const [notice, setNotice] = useState('');
  const [showAccount, setShowAccount] = useState(false);

  const request = useCallback(async (url: string, init?: RequestInit) => {
    const { data } = await supabase.auth.getSession();
    const token = data.session?.access_token;
    if (!token) throw new Error(hu ? 'Jelentkezz be az adminfelület használatához.' : 'Sign in to use the admin page.');
    const response = await fetch(url, {
      ...init,
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}`, ...init?.headers },
    });
    const payload = await response.json().catch(() => ({}));
    if (!response.ok) throw new Error(payload.message || (hu ? 'A kérés nem sikerült.' : 'The request failed.'));
    return payload;
  }, [hu]);

  const loadUsers = useCallback(async () => {
    if (!user) { setUsers([]); return; }
    setLoading(true);
    setError('');
    try {
      const result = await request('/api/admin/users');
      setUsers(result.users);
      setDrafts(Object.fromEntries(result.users.map((item: AdminUser) => [item.id, item.tier])));
    } catch (err) {
      setError(err instanceof Error ? err.message : (hu ? 'A betöltés nem sikerült.' : 'Could not load users.'));
    } finally {
      setLoading(false);
    }
  }, [hu, request, user]);

  useEffect(() => { void loadUsers(); }, [loadUsers]);

  const visibleUsers = useMemo(() => {
    const term = search.trim().toLowerCase();
    return term ? users.filter((item) => item.email?.toLowerCase().includes(term) || item.id.toLowerCase().includes(term)) : users;
  }, [search, users]);

  const saveTier = async (item: AdminUser) => {
    const tier = drafts[item.id] || item.tier;
    setSavingId(item.id);
    setError('');
    setNotice('');
    try {
      await request(`/api/admin/users/${item.id}/entitlement`, { method: 'PUT', body: JSON.stringify({ tier }) });
      setUsers((current) => current.map((entry) => entry.id === item.id ? { ...entry, tier } : entry));
      setNotice(hu ? `A csomag frissült: ${item.email || item.id}` : `Plan updated for ${item.email || item.id}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : (hu ? 'A módosítás nem sikerült.' : 'Could not update plan.'));
    } finally {
      setSavingId(null);
    }
  };

  return (
    <div className="min-h-screen bg-[#FCFAF7] text-[#2C0B12]">
      <header className="border-b border-[#EAE3D5] bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-5 sm:px-6">
          <div className="flex items-center gap-3">
            <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#621927] text-white"><ShieldCheck className="h-5 w-5" /></span>
            <div><p className="text-xs font-semibold uppercase tracking-widest text-[#7E7468]">Christmas Reset</p><h1 className="font-serif text-2xl font-bold">{hu ? 'Adminisztráció' : 'Administration'}</h1></div>
          </div>
          <a href="/" className="inline-flex items-center gap-2 rounded-xl border border-[#EAE3D5] px-4 py-2 text-sm font-semibold hover:bg-[#FAF7F2]"><ArrowLeft className="h-4 w-4" />{hu ? 'Vissza az oldalra' : 'Back to site'}</a>
        </div>
      </header>
      <main className="mx-auto max-w-6xl space-y-6 px-4 py-8 sm:px-6">
        {!user ? (
          <section className="rounded-3xl border border-[#EAE3D5] bg-white p-8 text-center shadow-sm">
            <ShieldCheck className="mx-auto mb-3 h-9 w-9 text-[#621927]" />
            <h2 className="font-serif text-xl font-bold">{hu ? 'Admin bejelentkezés szükséges' : 'Admin sign-in required'}</h2>
            <p className="mx-auto mt-2 max-w-md text-sm text-[#6B645B]">{hu ? 'Jelentkezz be az adminisztrátori fiókoddal. A hozzáférést a szerver ellenőrzi.' : 'Sign in with your administrator account. Access is verified by the server.'}</p>
            <button onClick={() => setShowAccount(true)} className="mt-5 rounded-xl bg-[#621927] px-5 py-3 text-sm font-bold text-white">{hu ? 'Bejelentkezés' : 'Sign in'}</button>
          </section>
        ) : (
          <>
            <section className="flex flex-wrap items-center justify-between gap-4 rounded-3xl border border-[#EAE3D5] bg-white p-5 shadow-sm">
              <div className="flex items-center gap-3"><span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#F1E9DB]"><Users className="h-5 w-5 text-[#621927]" /></span><div><h2 className="font-bold">{hu ? 'Felhasználók és csomagok' : 'Users and plans'}</h2><p className="text-sm text-[#7E7468]">{hu ? `${users.length} fiók` : `${users.length} accounts`}</p></div></div>
              <button onClick={() => void loadUsers()} disabled={loading} className="inline-flex items-center gap-2 rounded-xl border border-[#EAE3D5] px-4 py-2 text-sm font-semibold disabled:opacity-50"><RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />{hu ? 'Frissítés' : 'Refresh'}</button>
            </section>
            <section className="overflow-hidden rounded-3xl border border-[#EAE3D5] bg-white shadow-sm">
              <div className="border-b border-[#EAE3D5] p-4">
                <label className="flex max-w-md items-center gap-2 rounded-xl border border-[#EAE3D5] bg-[#FAF7F2] px-3"><Search className="h-4 w-4 text-[#7E7468]" /><input value={search} onChange={(event) => setSearch(event.target.value)} placeholder={hu ? 'Keresés e-mail vagy azonosító alapján' : 'Search email or user ID'} className="w-full bg-transparent py-2.5 text-sm outline-none" /></label>
              </div>
              {error && <p role="alert" className="m-4 rounded-xl bg-red-50 p-3 text-sm text-red-800">{error}</p>}
              {notice && <p role="status" className="m-4 rounded-xl bg-emerald-50 p-3 text-sm text-emerald-800">{notice}</p>}
              {loading && users.length === 0 ? <p className="p-8 text-center text-sm text-[#7E7468]">{hu ? 'Felhasználók betöltése…' : 'Loading users…'}</p> : visibleUsers.length === 0 ? <p className="p-8 text-center text-sm text-[#7E7468]">{hu ? 'Nincs megjeleníthető felhasználó.' : 'No users found.'}</p> : (
                <div className="overflow-x-auto">
                  <table className="w-full min-w-[620px] text-left text-sm">
                    <thead className="bg-[#FAF7F2] text-xs uppercase tracking-wide text-[#7E7468]"><tr><th className="px-5 py-3">{hu ? 'Felhasználó' : 'User'}</th><th className="px-5 py-3">{hu ? 'Regisztráció' : 'Joined'}</th><th className="px-5 py-3">{hu ? 'Előfizetési csomag' : 'Plan'}</th><th className="px-5 py-3">{hu ? 'Művelet' : 'Action'}</th></tr></thead>
                    <tbody className="divide-y divide-[#EAE3D5]">{visibleUsers.map((item) => <tr key={item.id}>
                      <td className="px-5 py-4"><p className="font-semibold">{item.email || (hu ? 'Nincs e-mail-cím' : 'No email')}</p><p className="mt-1 font-mono text-[10px] text-[#8C8378]">{item.id}</p></td>
                      <td className="px-5 py-4 text-[#6B645B]">{new Date(item.created_at).toLocaleDateString(hu ? 'hu-HU' : undefined)}</td>
                      <td className="px-5 py-4"><select aria-label={`${hu ? 'Csomag' : 'Plan'}: ${item.email || item.id}`} value={drafts[item.id] || item.tier} onChange={(event) => setDrafts((current) => ({ ...current, [item.id]: event.target.value as AdminUser['tier'] }))} className="rounded-lg border border-[#EAE3D5] bg-white px-3 py-2"><option value="free">Free</option><option value="standard">Standard</option><option value="premium">Premium</option></select></td>
                      <td className="px-5 py-4"><button onClick={() => void saveTier(item)} disabled={savingId === item.id || (drafts[item.id] || item.tier) === item.tier} className="inline-flex items-center gap-2 rounded-lg bg-[#621927] px-3 py-2 text-xs font-bold text-white disabled:cursor-not-allowed disabled:opacity-40"><Save className="h-3.5 w-3.5" />{savingId === item.id ? (hu ? 'Mentés…' : 'Saving…') : (hu ? 'Mentés' : 'Save')}</button></td>
                    </tr>)}</tbody>
                  </table>
                </div>
              )}
            </section>
            <p className="text-xs leading-relaxed text-[#7E7468]">{hu ? 'A csomagváltás azonnal frissíti a szerveroldali jogosultságot. A Free csomag visszavonja a fizetős hozzáférést.' : 'Plan changes update server-side access immediately. Free removes paid access.'}</p>
          </>
        )}
      </main>
      <AccountModal isOpen={showAccount} onClose={() => setShowAccount(false)} language={language} user={user} onSignedOut={onSignedOut} />
    </div>
  );
};
