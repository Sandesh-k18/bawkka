
# 🦉 backKA | Anonymous Intel & Feedback

**backKA** is a high-performance, anonymous messaging platform built for secure "whispers." It prioritizes user anonymity and data integrity through a verified-ownership model and modern web standards.

## 🛠 Technical Stack

* **Framework:** [Next.js 16.1.4 (App Router)](https://nextjs.org/)
* **Language:** TypeScript
* **Authentication:** [NextAuth.js](https://next-auth.js.org/) (Credentials only for now)
* **Database:** [MongoDB Atlas](https://www.mongodb.com/atlas)
* **Security:** AES-256 (At-Rest), TLS 1.2+ (In-Transit)
* **UI/UX:** Tailwind CSS, Framer Motion, Lucide React, Shadcn/UI
* **Fonts:** Poppins (Primary Typography)

---

## 🏗 Key Features

### 1. Anonymous "Whispers"

Allows users to receive messages without the sender revealing their identity. The core logic ensures a "fire-and-forget" flow to maintain high privacy.

### 2. Verified Ownership Model

A unique security state where usernames are temporary until verified via **6-digit OTP**.

* **Unverified:** Open/Guest state. Data is subject to erasure if a legitimate owner claims the handle.
* **Verified:** Persistent state. Locks the profile and associated "intel" to the user's identity.

### 3. Security-First Architecture

* **Storage:** Data persistence on MongoDB Atlas with WiredTiger encryption.
* **Anonymity:** Minimal data collection; we prioritize technical metadata over PII (Personally Identifiable Information).

---

## 🚀 Development

### Environment Setup

Create a `.env.local` file in the root directory and add the following:

```env
MONGODB_URI=your_mongodb_uri
NEXTAUTH_SECRET=your_secret
RESEND_API_KEY=your_smtp_config
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=secret__yours
HUGGINGFACE_API_KEY=hf_api__yours
UPSTASH_REDIS_REST_URL=rate_limit__yours
UPSTASH_REDIS_REST_TOKEN=rate_limit__yours
```

### Run Locally

```bash
npm install
npm run dev

```

### Deployment

The project is optimized for **Vercel**. Every push to `main` triggers an automatic deployment with edge-optimized asset delivery.

---

## 📂 Project Structure

* `src/app`: Next.js App Router (Pages, Layouts, and API Routes).
* `/src/components`: UI components (Shadcn) and Page-specific logic.
* `/src/context`: Global state providers (Auth, Theme).
* `/public`: Static assets including `backka.webp` and OG images.

---

## 📜 Metadata & SEO

The app uses a dynamic **Metadata API** to generate unique Open Graph (OG) tags for user profiles, facilitating professional link previews on social platforms.

> **Note:** Developed by [Not Anonymous](https://github.com/sandesh-k18). Driven by transparency and the open-source spirit.