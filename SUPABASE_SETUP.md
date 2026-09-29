# Supabase account setup

The application uses Supabase Auth for accounts and Postgres for account progress and trusted plan entitlements. The browser publishable key is public by design; never put a Supabase `service_role` key in a `VITE_` variable or browser code.

## Prepare the project

1. Confirm `VITE_SUPABASE_URL` and `VITE_SUPABASE_PUBLISHABLE_KEY` in the deployment environment. `.env.example` shows the expected names.
2. Apply `supabase/migrations/202609280001_secure_accounts_and_progress.sql` to the intended Supabase project, using the Supabase CLI or SQL Editor.
3. In Supabase Authentication settings, set the production Site URL and allow the app's exact origin as a redirect URL. Configure email delivery before enabling public signups in production.
4. Review the Auth email confirmation and password policies for the app's audience.

## Plan entitlements

New accounts receive the `free` plan. Browser clients can read their own entitlement but cannot change it. Until a payment provider is integrated, paid access can only be granted by a trusted project administrator, for example from the SQL Editor:

```sql
update public.account_entitlements
set tier = 'standard', updated_at = now()
where user_id = (select id from auth.users where email = 'customer@example.com');
```

Use `premium` in place of `standard` for the Premium plan. Do not expose an admin/service role credential to the application client. When online payments are added, a verified provider webhook should create the purchase record and update the entitlement server-side.

## Admin page

Set `SUPABASE_SERVICE_ROLE_KEY` in the server environment to the Supabase service role secret, and set `ADMIN_EMAILS` to a comma-separated list of administrator email addresses. These are server-only variables: do not prefix them with `VITE_` or put them in browser code. Sign in using an email in that allowlist and open `/admin`. The page lists registered accounts and lets an administrator assign `free`, `standard`, or `premium`. The server verifies the Supabase session and allowlisted email on every admin API request before using the service role. Selecting `free` revokes paid access.

An entitlement change updates access immediately for subsequent server requests; a user with the app already open may need to refresh to reload their current plan. Admin plan changes are manual access grants and do not represent a verified payment.

The migration also replaces policies on the legacy `subscriptions` and `user_progress` tables. Apply it only to the Supabase project this app is intended to use, then inspect the resulting policies in the Dashboard.
