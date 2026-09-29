import React, { useState } from 'react';
import { X, UserRound, Mail, LockKeyhole } from 'lucide-react';
import type { User } from '@supabase/supabase-js';
import { supabase } from '../lib/supabase';

interface AccountModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: User | null;
  language: string;
  onSignedOut: () => void;
}

export const AccountModal: React.FC<AccountModalProps> = ({ isOpen, onClose, user, language, onSignedOut }) => {
  const [mode, setMode] = useState<'sign-in' | 'sign-up' | 'reset' | 'update-password'>(() =>
    window.location.hash.includes('type=recovery') ? 'update-password' : 'sign-in',
  );
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);
  const hu = language === 'hu';

  if (!isOpen) return null;

  const submit = async (event: React.FormEvent) => {
    event.preventDefault();
    setBusy(true);
    setError('');
    setMessage('');
    try {
      if (mode === 'update-password') {
        const { error: authError } = await supabase.auth.updateUser({ password });
        if (authError) throw authError;
        window.history.replaceState(null, '', window.location.pathname + window.location.search);
        setMessage(hu ? 'A jelszavad frissült.' : 'Your password has been updated.');
        setMode('sign-in');
      } else if (mode === 'sign-up') {
        const { error: authError } = await supabase.auth.signUp({
          email: email.trim(),
          password,
          options: { emailRedirectTo: window.location.origin },
        });
        if (authError) throw authError;
        setMessage(hu ? 'Ellenőrizd az e-mail-fiókodat a regisztráció megerősítéséhez.' : 'Check your email to confirm your account.');
      } else if (mode === 'reset') {
        const { error: authError } = await supabase.auth.resetPasswordForEmail(email.trim(), { redirectTo: window.location.origin });
        if (authError) throw authError;
        setMessage(hu ? 'Ha a címhez tartozik fiók, elküldtük a jelszó-visszaállító linket.' : 'If an account exists for that address, a reset link has been sent.');
      } else {
        const { error: authError } = await supabase.auth.signInWithPassword({ email: email.trim(), password });
        if (authError) throw authError;
        onClose();
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : (hu ? 'Nem sikerült végrehajtani a műveletet.' : 'The request could not be completed.'));
    } finally {
      setBusy(false);
    }
  };

  const signOut = async () => {
    setBusy(true);
    const { error: authError } = await supabase.auth.signOut();
    setBusy(false);
    if (authError) setError(authError.message);
    else {
      onSignedOut();
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm" role="presentation" onClick={(event) => { if (event.target === event.currentTarget) onClose(); }}>
      <section role="dialog" aria-modal="true" aria-labelledby="account-title" className="w-full max-w-md overflow-hidden rounded-3xl border border-[#D8B76E]/40 bg-white shadow-2xl">
        <header className="flex items-center justify-between border-b border-[#EAE3D5] bg-[#FAF7F2] px-6 py-5">
          <h2 id="account-title" className="flex items-center gap-2 font-serif text-xl font-bold text-[#2C0B12]">
            <UserRound className="h-5 w-5 text-[#621927]" />{hu ? 'Fiók' : 'Account'}
          </h2>
          <button onClick={onClose} aria-label={hu ? 'Bezárás' : 'Close'} className="rounded-full p-2 text-[#7E7468] hover:bg-[#F1E9DB]"><X className="h-5 w-5" /></button>
        </header>
        <div className="space-y-4 p-6">
          {user && mode !== 'update-password' ? (
            <>
              <p className="text-sm text-[#4A453E]">{hu ? 'Bejelentkezve mint' : 'Signed in as'} <strong>{user.email}</strong></p>
              <p className="text-xs text-[#7E7468]">{hu ? 'A csomagjogosultság ehhez a fiókhoz tartozik.' : 'Your plan is linked to this account.'}</p>
              <button onClick={signOut} disabled={busy} className="w-full rounded-xl bg-[#621927] py-3 text-sm font-bold text-white disabled:opacity-60">{hu ? 'Kijelentkezés' : 'Sign out'}</button>
            </>
          ) : (
            <>
              <p className="text-sm text-[#6B645B]">{mode === 'sign-up' ? (hu ? 'Hozz létre fiókot az eszközök közti szinkronhoz.' : 'Create an account to sync across devices.') : mode === 'reset' ? (hu ? 'Add meg a fiókod e-mail-címét.' : 'Enter your account email.') : mode === 'update-password' ? (hu ? 'Adj meg egy új jelszót a fiókodhoz.' : 'Choose a new password for your account.') : (hu ? 'Jelentkezz be a mentett haladásod és csomagod eléréséhez.' : 'Sign in to access your saved progress and plan.')}</p>
              <form onSubmit={submit} className="space-y-3">
                {mode !== 'update-password' && <label className="flex items-center gap-2 rounded-xl border border-[#EAE3D5] bg-[#FAF7F2] px-3"><Mail className="h-4 w-4 text-[#7E7468]" /><input type="email" autoComplete="email" required value={email} onChange={e => setEmail(e.target.value)} placeholder="email@example.com" className="w-full bg-transparent py-3 text-sm outline-none" /></label>}
                {mode !== 'reset' && <label className="flex items-center gap-2 rounded-xl border border-[#EAE3D5] bg-[#FAF7F2] px-3"><LockKeyhole className="h-4 w-4 text-[#7E7468]" /><input type="password" autoComplete={mode === 'sign-in' ? 'current-password' : 'new-password'} required minLength={8} value={password} onChange={e => setPassword(e.target.value)} placeholder={hu ? 'Jelszó (legalább 8 karakter)' : 'Password (at least 8 characters)'} className="w-full bg-transparent py-3 text-sm outline-none" /></label>}
                {error && <p role="alert" className="text-sm text-red-700">{error}</p>}
                {message && <p role="status" className="text-sm text-emerald-800">{message}</p>}
                <button disabled={busy} className="w-full rounded-xl bg-[#621927] py-3 text-sm font-bold text-white disabled:opacity-60">{busy ? (hu ? 'Feldolgozás…' : 'Working…') : mode === 'sign-up' ? (hu ? 'Fiók létrehozása' : 'Create account') : mode === 'reset' ? (hu ? 'Visszaállító link küldése' : 'Send reset link') : mode === 'update-password' ? (hu ? 'Jelszó módosítása' : 'Update password') : (hu ? 'Bejelentkezés' : 'Sign in')}</button>
              </form>
              <div className="flex flex-wrap justify-between gap-2 text-xs text-[#621927]">
                {mode !== 'sign-in' && <button onClick={() => { setMode('sign-in'); setError(''); setMessage(''); }}>{hu ? 'Bejelentkezés' : 'Sign in'}</button>}
                {mode === 'sign-in' && <button onClick={() => setMode('reset')}>{hu ? 'Elfelejtett jelszó' : 'Forgot password'}</button>}
                {mode !== 'sign-up' && <button onClick={() => { setMode('sign-up'); setError(''); setMessage(''); }}>{hu ? 'Fiók létrehozása' : 'Create account'}</button>}
              </div>
            </>
          )}
        </div>
      </section>
    </div>
  );
};
