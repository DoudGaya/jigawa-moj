Project: jigawa Ministry of Justice – E-Filing System with Paystack Integration

Context
- Tech stack: Next.js 15 (App Router, React Server Components), TypeScript, Tailwind CSS, shadcn/ui, Prisma (MongoDB), NextAuth v5.
- Existing models include: User, Filing, Affidavit, DeclarationOfAge, Case, Customer, Transaction, etc.
- Branding and design patterns already established in the app; maintain consistency across components and pages.

High-Level Goals
1) Build a customer-facing e-filing experience for:
   - Affidavit (E-Affidavit)
   - Declaration of Age (E-Declaration of Age)
   - Probate (if present)
   - Case filing (optional, if part of customer flow)
2) Integrate Paystack for payments (hosted checkout flow), with robust verification and receipts.
3) Build court-facing workflows to review, accept/reject, schedule, and manage filings.
4) Maintain role-based access and existing authentication/middleware patterns.
5) Ensure accessibility, reliability, and secure handling of user data.

Requirements

A) Customer E-Filing
- Pages (App Router):
  - app/(protected)/customer/e-filing/page.tsx (dashboard: list filings, statuses, actions)
  - app/(protected)/customer/e-filing/affidavit/page.tsx (form + payment)
  - app/(protected)/customer/e-filing/declaration-of-age/page.tsx (form + payment)
  - app/(protected)/customer/e-filing/success/page.tsx (payment success + receipt)
  - app/(protected)/customer/e-filing/history/page.tsx (timeline + PDF/print)
- UI/UX:
  - Use shadcn/ui components (Form, Input, Textarea, Select, Tabs, Steps/Progress).
  - Responsive layouts, accessible forms (labels, aria), client-side validation with zod.
  - Adopt existing color palette and typography; reuse layout components.
- Validation:
  - zod schemas for Affidavit and Declaration of Age.
  - Server-side validation in Server Actions.
- Storage:
  - Persist Affidavit and DeclarationOfAge in their respective models.
  - Create a Filing record per submission with filingType and status.
- Status lifecycle:
  - FilingStatus: Draft → Submitted → UnderReview → Accepted/Rejected.
  - Provide a status timeline component and activity log (who/when).
- Notifications:
  - Email confirmation via Resend (if configured) upon submission and status changes.
- Documents:
  - Generate a simple PDF/print view for Affidavit/Declaration with reference number and timestamp.
- Optional uploads:
  - If attachments required, integrate UploadThing and persist file URLs.

B) Paystack Integration
- Service:
  - lib/payments/paystack.ts: initializeTransaction(amount, email, metadata), verifyTransaction(reference).
- Environment:
  - .env: PAYSTACK_SECRET_KEY, PAYSTACK_PUBLIC_KEY, APP_URL.
- Flow:
  1) On submit, create Filing with status Draft and Transaction with status PENDING.
  2) Server Action calls Paystack initialize endpoint, returns authorization_url.
  3) Redirect user to Paystack hosted checkout.
  4) Implement webhook at app/api/paystack/webhook/route.ts:
     - Verify signature.
     - Verify transaction via Paystack API.
     - Update Transaction: PAID or FAILED.
     - Update Filing status: Submitted → UnderReview when PAID.
  5) Implement return/verify page app/(protected)/customer/e-filing/success/page.tsx for user feedback and receipt.
- Data:
  - Transaction.amount, paymentRef (Paystack reference), paymentFor, customerId.
  - Link Transaction to Filing OR add optional filingId to Transaction (preferred for non-case filings).

C) Court Portal
- Pages:
  - app/(protected)/court/filings/page.tsx (review queue with filters/search)
  - app/(protected)/court/filings/[id]/page.tsx (detail view: affidavit/declaration data, customer info, activity)
- Actions:
  - Accept/Reject with comments, auto-update Filing.status, notify customer.
  - Assign caseNumber/courtRoom where applicable; schedule Hearing (optional).
  - Export/print views.
- Moderation:
  - Track reviewer (court staff) and decision timestamp.
  - Maintain audit log of changes.

D) Admin/Ministry
- Pages:
  - app/(protected)/ministry/filings/page.tsx (global view, metrics)
  - app/(protected)/ministry/settings/pricing/page.tsx (configure fees per FilingType)
- Analytics:
  - Cards for counts, revenue, trends (by FilingType/status).

E) Implementation Details
- Server Actions:
  - actions/filings.ts:
    - createAffidavitFiling(data, userId)
    - createDeclarationFiling(data, userId)
    - startPaymentForFiling(filingId, amount)
    - verifyPayment(reference)
    - courtReviewFiling(filingId, decision, comment)
- Components:
  - components/filing/AffidavitForm.tsx
  - components/filing/DeclarationForm.tsx
  - components/filing/FilingTimeline.tsx
  - components/filing/PaymentSummary.tsx
- Schema:
  - Use existing Affidavit, DeclarationOfAge, Filing, Transaction models.
  - If needed, extend Transaction with optional filingId: String? @db.ObjectId (MongoDB).
- Security:
  - Role-based guards via middleware and server-side checks.
  - Sanitize user input; rate-limit payment endpoints; verify Paystack signatures.
  - Avoid leaking internal IDs; use stable public references where appropriate.
- Accessibility & Quality:
  - Keyboard navigation, proper ARIA attributes.
  - Error boundaries, toast notifications, graceful fallback.
  - Unit tests for Server Actions, integration tests for payment flow.

F) Deliverables
- Fully functional pages/components with consistent styling.
- Paystack integration (initialize, webhook, verify).
- Email notifications on submission and status changes.
- Seed script for test users with password “123456789”:
  - admin@ministry.com (role: ADMIN)
  - officer@police.com (role: POLICE)
  - clerk@court.com (role: COURT)
  - user@customer.com (role: USER + Customer profile)
- README updates: environment variables, payment flow, testing instructions.

G) Acceptance Criteria
- A customer can file an affidavit or declaration, complete payment via Paystack, receive confirmation, and see their filing in history with correct status.
- Court users can review, accept/reject, and trigger notifications; actions are reflected in timelines.
- Transactions are accurately recorded and verifiable via Paystack.
- UI matches existing branding and passes basic a11y checks.
- All critical paths have tests and meaningful error handling.

Notes
- Follow the existing folder structure, component conventions, and Tailwind/shadcn patterns.
- Use Server Actions for mutations and Prisma for persistence.
- Keep code modular, documented, and maintain type safety with zod + TypeScript.
