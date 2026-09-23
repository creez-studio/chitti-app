# Chitti

A responsive family chitti web app, built with React, Vinext and Cloudflare D1.

## Included

- Owner and member accounts using phone number/member ID plus a password (minimum 10 characters).
- Multiple chittis, monthly schedules, fixed contribution amounts, single-use member invitations and WhatsApp share links.
- Cash/UPI payment claims, transaction references, owner confirmation/rejection and per-month payment filters.
- Owner-selected draw picker, server-selected random winners, shared result polling, a draggable 3D-look glass bowl, folded-paper mixing and lift animation, unfolding winner reveal and confetti.
- Previous winners cannot win again. Winners and paused members retain their full monthly obligations.
- Recorded offline draws with a note; pausing/restoring eligibility does not delete records.
- Personal contributions, awards, remaining commitments and net cash flow. No fees or interest model.
- English and Malayalam core interface labels; some descriptive text remains English in this first version.
- Persistent server-side records, salted PBKDF2 passwords, expiring HttpOnly sessions, login throttling and optimistic concurrency checks.
- Owner-controlled maintenance screen.

## First use

Create an account, create a chitti, and fill the remaining member slots. A chitti has one slot per month and the owner is the first member. Use each member's invitation link only for that person. Each invitee creates their own account and accepts the invitation. Fill all slots before the first draw. A draw records the awarded amount; it does not execute a transfer.

The sample circle uses illustrative data only and is not persisted.

## Local development

Requires Node 22.13+ (Node 24 recommended).

```sh
npm ci
npm run dev
```

D1 schema is in `db/schema.ts`; migrations are in `drizzle/`. Apply migrations to a local Wrangler database before testing account flows. Production migrations are applied by Sites during publishing.

```sh
npx tsc --noEmit
npm run build
```

## Hosting and GitHub

This project is published through Sites. `.openai/hosting.json` identifies the Site; do not replace its project ID. Source changes on GitHub are not automatically deployed to Sites. Ask Codex to publish after edits. GitHub Actions checks the TypeScript build; it does not have deployment credentials.

Before maintenance, enable **Settings → Maintenance mode** for each affected chitti. Make and publish the changes, verify them, then disable maintenance. Automatic maintenance detection from GitHub and automatic deployment are not yet connected.

## Integration limits

- Phone numbers are login identifiers, not verified phone identities. SMS OTP and password recovery are not connected.
- WhatsApp links open a draft for the sender. Automatic WhatsApp/SMS reminders and background push notifications require provider setup.
- UPI opens an installed payment app when the owner provides a UPI ID. It does not verify settlement; the owner must confirm receipt.
- Draw screens poll every four seconds. Animations start after a newly recorded result arrives and are not frame-synchronized.
- The Site and GitHub repository are public. Chitti records still require an account and membership.

## Validation

TypeScript and production build checks, plus local API integration checks covering account creation, invitation consumption, authorization, payment review, duplicate payment protection, draw picker authorization, no repeat winners, continued payments after winning, and maintenance enforcement.
