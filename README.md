# The Admission Bridge

**"Bridge the Gap to Your Dream University"**

## Overview

The Admission Bridge is a modern web application designed to streamline the university admission process for students. This project is built using **Next.js 14+ (App Router)**, prioritizing performance, SEO, and type safety via **TypeScript**. It integrates with **Supabase** for backend services, ensuring scalable data management and authentication.

## Software Architecture

This application follows a **Server-First** architecture leveraging React Server Components (RSC).

### Tech Stack

-   **Framework**: Next.js (App Router)
-   **Language**: TypeScript
-   **Styling**: CSS Modules / Tailwind CSS (via `globals.css`)
-   **Typography**: `next/font` (Inter) for zero-layout-shift font loading.
-   **Backend/Database**: Supabase (PostgreSQL).

### Architectural Decisions

1.  **Root Layout Strategy (`src/app/layout.tsx`)**:
    -   The `RootLayout` serves as the application shell. It handles the injection of global fonts (`Inter`) and structural components like the `Navbar` and `Footer`.
    -   **Hydration Management**: We utilize `suppressHydrationWarning` on the body tag to prevent mismatches caused by browser extensions, ensuring a clean client-side takeover.

2.  **Component Modularity**:
    -   **Layout Components**: `Navbar` and `Footer` are separated into `@/components/layout` to maintain separation of concerns between page content and navigation chrome.
    -   **Debug Utilities**: The `<SupabaseDebug />` component is integrated into the root to provide real-time feedback on database connectivity during development.

3.  **Data Flow**:
    -   The app is designed to fetch data on the server where possible (using Server Components) to reduce client-side bundle size and improve First Contentful Paint (FCP).

```

## Getting Started

### Prerequisites

-   **Node.js**: v18.17.0 or higher
-   **Package Manager**: npm, yarn, or pnpm

### Installation

1.  **Clone the repository:**
    ```bash
    git clone <repository-url>
    cd The-Admission-Bridge
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Environment Setup:**
    Create a `.env.local` file in the root directory to configure your Supabase connection.
    ```env
    NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
    NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
    ```

### Running the Application

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
