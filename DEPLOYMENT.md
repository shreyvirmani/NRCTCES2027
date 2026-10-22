# NCRTCES 2027 domain migration

## Current deployment findings (2026-10-21)

- Vercel project: `nrctces-msit-2027`, project ID `prj_vS0RLepwgYIUqwOAvBrnoPwfwv5g`.
- The project is linked to `shreyvirmani/NRCTCES2027`; its latest ready production deployment is from `main` at `5d0c5be`.
- `2027.ncrtces-msit.in` is verified on that project. Keep this domain assigned during migration and rollback testing.
- The local Vercel integration can see the 2027 project, but Vercel returns 403 for `ncrtces-msit.in` and `www.ncrtces-msit.in`, so it cannot inspect their current project ownership or change those mappings.
- Live HTTP checks: `https://2027.ncrtces-msit.in/` returns the 2027 title; `https://www.ncrtces-msit.in/` returns the 2026 title; `https://www.ncrtces-msit.in/conferences/2026/` returns 404.
- `https://ncrtces-msit.in/` currently redirects to `https://www.ncrtces-msit.in/`; retain that canonical direction unless the domain owner has a reason to change it.
- The repository has no 2026 archive files. The archive route must be connected to the existing 2026 deployment before the `www` domain moves. Do not point it back to `www.ncrtces-msit.in`, which would loop after the migration.

## Preview and archive prerequisite

1. Push the reviewed source changes to a branch and let the connected Vercel project create a Preview deployment. This does not move production domains.
2. Test the preview homepage, desktop/mobile navigation, keyboard focus and Escape behavior, and the existing `/admin-demo` route.
3. Ask the owner of the current 2026 Vercel project for its stable deployment URL (usually its `*.vercel.app` production alias) or access to that project. The current `/conferences/2026/` URL is not serving an archive, so its intended origin cannot be inferred safely.
4. Once the 2026 origin is confirmed, add a specific archive route/proxy before testing. Preserve the 2026 app's own page and asset requests; verify its page, CSS, JavaScript, images, direct URL and refresh on the preview domain. Do not use the generic SPA fallback as the archive response.
5. Do not promote the preview or change domains until both editions pass those checks.

The current `vercel.json` catch-all rewrite is retained for the 2027 SPA route `/admin-demo`. Vercel gives deployed filesystem files precedence over rewrites, so an archive built into the output can take precedence; this repo does not currently contain such an archive. See [Vercel rewrite documentation](https://vercel.com/docs/routing/rewrites) and [Vercel project configuration](https://vercel.com/docs/project-configuration/vercel-json).

## Production cutover (dashboard)

After the archive works in Preview and the domain owner confirms project access:

1. In Vercel, open the `nrctces-msit-2027` project and confirm the Git repository, production branch (`main`), install command (`npm ci`), build command (`npm run build`), output directory (`dist`), and latest successful deployment.
2. In **Settings → Domains**, add `www.ncrtces-msit.in` to this project. If Vercel reports it is assigned elsewhere, coordinate with the current domain/project owner; do not remove the old assignment until the archive route is ready and tested.
3. Keep `2027.ncrtces-msit.in` assigned to this project.
4. Add `ncrtces-msit.in` and configure it to redirect to `www.ncrtces-msit.in` (Vercel recommends `www` as the primary host). Do this in the Domains settings, not with a broad app rewrite.
5. At the DNS provider, make only the records Vercel shows for each domain. Do not reuse an old CNAME/A target from memory. Wait for Vercel to show the domains as configured and HTTPS certificates as active.
6. Test `https://www.ncrtces-msit.in/`, `https://ncrtces-msit.in/`, `https://www.ncrtces-msit.in/conferences/2026/`, direct archive refresh, archive assets, and `https://2027.ncrtces-msit.in/`.

## Rollback

Keep the previous 2026 project and the 2027 subdomain available. If the primary homepage or archive fails, use Vercel **Settings → Domains** to move `www.ncrtces-msit.in` back to its recorded previous 2026 project/deployment and restore the prior apex redirect/DNS configuration if it was changed. Do not delete deployments. Keep the 2027 subdomain pointed at the 2027 project during rollback. The currently available Vercel access cannot manage the primary-domain project; the domain/project owner must perform or grant access for reassignment.

## Verification status

- `npm ci`: passed; installed 17 packages from the existing lockfile. npm reported 2 dependency audit advisories (1 moderate, 1 high).
- `npm run build`: passed; Vite transformed 1,577 modules.
- `npm run lint` / tests: no lint or test scripts are configured in this repository.
- Browser verification: not available in the current session; no browser was exposed by the computer-use inventory.
- Local built preview check: `/` returns the 2027 app, but `/conferences/2026/` also falls back to the 2027 app because this repo has no archive files and `vercel.json` has a catch-all SPA rewrite. Do not deploy this as a complete domain migration until the archive origin/route is configured.
- Production domain change: not performed.
- Archive route: currently 404 in production; migration is blocked on identifying and routing the existing 2026 deployment.
