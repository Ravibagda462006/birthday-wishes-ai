# Romantic Birthday Wishes AI

A beautiful AI-powered birthday wishes and love letters generator with romantic animations and elegant design.

## Features

- **AI Wish Generator**: 5 different wish types (Romantic, Cute, Emotional, Flirty, Poetic)
- **Love Letter Generator**: Short, Long, and Good Morning Birthday Letters
- **Beautiful UI**: Romantic design with floating hearts and smooth animations
- **Share Functionality**: Copy text, share via WhatsApp, or download as HTML card
- **Personalized Content**: Tailored messages for crush or girlfriend relationships

## Tech Stack

- React 18 + TypeScript
- Vite
- Tailwind CSS
- Lucide React Icons
- Supabase (PostgreSQL database)

## Getting Started

### Prerequisites

- Node.js 18+ installed
- Supabase account (free tier works)

### Installation

1. Clone or extract the project files

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
Create a `.env` file with:
```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

4. Run the development server:
```bash
npm run dev
```

5. Open http://localhost:5173 in your browser

### Database Setup

The Supabase migration is already included in `supabase/migrations/`. It creates:
- `wishes` table - stores generated wishes
- `love_letters` table - stores generated letters
- `shared_cards` table - tracks sharing activity

Tables have Row Level Security (RLS) enabled with appropriate policies.

## Building for Production

```bash
npm run build
npm run preview
```

## Usage

1. Enter the recipient's name
2. Select relationship type (Crush or Girlfriend)
3. Choose between Birthday Wishes or Love Letters
4. Select a style/type
5. Click Generate
6. Preview and share via:
   - Copy to clipboard
   - WhatsApp
   - Download as beautiful HTML card

## License

MIT License - Feel free to use and modify for your projects.

Made with love to spread love and happiness.# birthday-wishes-ai
