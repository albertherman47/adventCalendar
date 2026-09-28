import React, { useState, useEffect } from 'react';
import { Database, CheckCircle2, AlertCircle, RefreshCw, Copy, Check, ExternalLink, X, ShieldCheck } from 'lucide-react';
import { SupportedLanguage } from '../types';

interface DatabaseStatusModalProps {
  isOpen: boolean;
  onClose: () => void;
  language: SupportedLanguage;
}

interface TestResult {
  success: boolean;
  connected: boolean;
  url: string;
  totalLatencyMs: number;
  auth: {
    reachable: boolean;
    latencyMs: number;
    message: string;
  };
  database: {
    reachable: boolean;
    latencyMs: number;
    subscriptionsTable: {
      exists: boolean;
      status: string;
      details: string;
    };
    userProgressTable: {
      exists: boolean;
      status: string;
      details: string;
    };
  };
  sqlSchema: string;
  summary: string;
}

export const DatabaseStatusModal: React.FC<DatabaseStatusModalProps> = ({
  isOpen,
  onClose,
  language,
}) => {
  const [loading, setLoading] = useState(false);
  const [testResult, setTestResult] = useState<TestResult | null>(null);
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const runDatabaseTest = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('/api/supabase/test');
      if (!response.ok) {
        throw new Error(`HTTP hiba: ${response.status}`);
      }
      const data: TestResult = await response.json();
      setTestResult(data);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err);
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      runDatabaseTest();
    }
  }, [isOpen]);

  const copySqlSchema = () => {
    if (!testResult?.sqlSchema) return;
    navigator.clipboard.writeText(testResult.sqlSchema);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-[#eee7e4] overflow-hidden my-6">
        {/* Header */}
        <div className="px-5 py-4 bg-[#fff8f6] border-b border-[#eee7e4] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#4a151b]/10 text-[#4a151b] flex items-center justify-center">
              <Database className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-serif text-lg font-bold text-[#2C0B12]">
                {language === 'hu' ? 'Supabase Adatbázis Állapot & Élő Teszt' : 'Supabase Database Status & Live Test'}
              </h3>
              <p className="text-xs text-[#524345]">
                clapfpjmglvlyyoklnpe.supabase.co
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full flex items-center justify-center text-[#524345] hover:bg-[#ebdcd9] transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-5 sm:p-6 space-y-5 max-h-[75vh] overflow-y-auto">
          {/* Status Overview Card */}
          <div className="p-4 rounded-xl border border-[#e4d7d5] bg-[#fffaf9]">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-center gap-2.5">
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
                </span>
                <span className="text-sm font-bold text-[#2C0B12]">
                  {language === 'hu' ? 'Supabase Projekt: Online és Csatlakozva' : 'Supabase Project: Online & Connected'}
                </span>
              </div>
              <button
                onClick={runDatabaseTest}
                disabled={loading}
                className="inline-flex items-center justify-center gap-2 px-3 py-1.5 rounded-lg bg-[#4a151b] text-white text-xs font-semibold hover:bg-[#68232a] transition-colors disabled:opacity-50 cursor-pointer w-full sm:w-auto"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
                <span>{loading ? (language === 'hu' ? 'Tesztelés...' : 'Testing...') : (language === 'hu' ? 'Újratesztelés Most' : 'Retest Now')}</span>
              </button>
            </div>

            {testResult && (
              <div className="mt-3 pt-3 border-t border-[#eee7e4] grid grid-cols-2 sm:grid-cols-3 gap-2.5 text-xs">
                <div className="bg-white p-2.5 rounded-lg border border-[#eee7e4]">
                  <span className="text-gray-500 block">{language === 'hu' ? 'Válaszidő' : 'Latency'}</span>
                  <span className="font-bold text-emerald-700">{testResult.totalLatencyMs} ms</span>
                </div>
                <div className="bg-white p-2.5 rounded-lg border border-[#eee7e4]">
                  <span className="text-gray-500 block">Auth API</span>
                  <span className="font-bold text-emerald-700">{testResult.auth.reachable ? '✓ Aktív' : 'Hiba'}</span>
                </div>
                <div className="bg-white p-2.5 rounded-lg border border-[#eee7e4] col-span-2 sm:col-span-1">
                  <span className="text-gray-500 block">PostgreSQL</span>
                  <span className="font-bold text-emerald-700">{testResult.database.reachable ? '✓ Csatlakozva' : 'Nem elérhető'}</span>
                </div>
              </div>
            )}
          </div>

          {error && (
            <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-xl flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {/* Test Diagnosis Summary */}
          {testResult && (
            <div className="space-y-3">
              <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                {language === 'hu' ? 'Adatbázis Táblák Állapota' : 'Database Tables Status'}
              </h4>

              <div className="space-y-2">
                {/* subscriptions table */}
                <div className="p-3 bg-white rounded-xl border border-[#eee7e4] flex items-start justify-between gap-3">
                  <div className="flex items-start gap-2.5">
                    {testResult.database.subscriptionsTable.exists ? (
                      <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                    ) : (
                      <AlertCircle className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                    )}
                    <div>
                      <div className="font-mono text-xs font-bold text-[#2C0B12]">public.subscriptions</div>
                      <div className="text-xs text-[#524345]">
                        {testResult.database.subscriptionsTable.exists
                          ? (language === 'hu' ? 'A tábla létezik, vásárlások és előfizetések mentése aktív.' : 'Table exists and active.')
                          : (language === 'hu' ? 'A tábla még nincs létrehozva a Supabase projektben.' : 'Table not yet created.')}
                      </div>
                    </div>
                  </div>
                  <span className={`text-[11px] px-2 py-0.5 rounded-full font-semibold shrink-0 ${
                    testResult.database.subscriptionsTable.exists
                      ? 'bg-emerald-100 text-emerald-800'
                      : 'bg-amber-100 text-amber-800'
                  }`}>
                    {testResult.database.subscriptionsTable.exists ? 'Kész' : 'SQL futtatás szükséges'}
                  </span>
                </div>

                {/* user_progress table */}
                <div className="p-3 bg-white rounded-xl border border-[#eee7e4] flex items-start justify-between gap-3">
                  <div className="flex items-start gap-2.5">
                    {testResult.database.userProgressTable.exists ? (
                      <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                    ) : (
                      <AlertCircle className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                    )}
                    <div>
                      <div className="font-mono text-xs font-bold text-[#2C0B12]">public.user_progress</div>
                      <div className="text-xs text-[#524345]">
                        {testResult.database.userProgressTable.exists
                          ? (language === 'hu' ? 'A tábla létezik, haladás és feloldott napok szinkronizálása aktív.' : 'Table exists and active.')
                          : (language === 'hu' ? 'A tábla még nincs létrehozva a Supabase projektben.' : 'Table not yet created.')}
                      </div>
                    </div>
                  </div>
                  <span className={`text-[11px] px-2 py-0.5 rounded-full font-semibold shrink-0 ${
                    testResult.database.userProgressTable.exists
                      ? 'bg-emerald-100 text-emerald-800'
                      : 'bg-amber-100 text-amber-800'
                  }`}>
                    {testResult.database.userProgressTable.exists ? 'Kész' : 'SQL futtatás szükséges'}
                  </span>
                </div>
              </div>

              {/* Instructions & Copyable SQL */}
              {(!testResult.database.subscriptionsTable.exists || !testResult.database.userProgressTable.exists) && (
                <div className="mt-4 p-4 rounded-xl bg-[#fff8eb] border border-[#f5dfa6] space-y-3">
                  <div className="flex items-start gap-2 text-amber-900 text-xs">
                    <ShieldCheck className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold">
                        {language === 'hu'
                          ? 'A Supabase kapcsolat működik! Már csak a táblákat kell létrehoznod 1 kattintással:'
                          : 'Supabase connection is working! Just run this SQL once to create the tables:'}
                      </p>
                      <ol className="list-decimal list-inside mt-1 space-y-1 text-amber-800">
                        <li>
                          {language === 'hu' ? 'Kattints az alábbi ' : 'Click below '}
                          <a
                            href="https://supabase.com/dashboard/project/clapfpjmglvlyyoklnpe/sql/new"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="font-bold underline inline-flex items-center gap-0.5 text-amber-900"
                          >
                            Supabase SQL Editor <ExternalLink className="w-3 h-3 inline" />
                          </a>
                          {language === 'hu' ? ' hivatkozásra.' : ' link.'}
                        </li>
                        <li>{language === 'hu' ? 'Másold be ezt az SQL kódot (kattints a Másolás gombra):' : 'Copy this SQL schema (click the Copy button):'}</li>
                        <li>{language === 'hu' ? 'Nyomd meg a "Run" gombot a Supabase felületén.' : 'Press "Run" in your Supabase Dashboard.'}</li>
                      </ol>
                    </div>
                  </div>

                  <div className="relative">
                    <pre className="bg-[#1e1e1e] text-emerald-400 p-3.5 rounded-lg text-[11px] font-mono overflow-x-auto max-h-48 border border-black/20">
                      {testResult.sqlSchema}
                    </pre>
                    <button
                      onClick={copySqlSchema}
                      className="absolute top-2 right-2 px-2.5 py-1.5 rounded-md bg-white/20 hover:bg-white/30 text-white text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
                    >
                      {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copied ? (language === 'hu' ? 'Kimásolva!' : 'Copied!') : (language === 'hu' ? 'SQL Másolása' : 'Copy SQL')}</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-5 py-3 bg-[#fff8f6] border-t border-[#eee7e4] flex items-center justify-between">
          <span className="text-xs text-[#524345]">
            {language === 'hu' ? 'Supabase PostgreSQL + Firebase Dupla Adatbázis Védelem' : 'Supabase PostgreSQL + Firebase Dual Persistence'}
          </span>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-[#4a151b] text-white text-xs font-bold hover:bg-[#68232a] transition-colors cursor-pointer"
          >
            {language === 'hu' ? 'Bezárás' : 'Close'}
          </button>
        </div>
      </div>
    </div>
  );
};
