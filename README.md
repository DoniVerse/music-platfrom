# Music Platform

A full-featured music streaming platform with search, playback, playlists, and user authentication.

## 🎥 Demo Video
[![Watch the demo](https://img.youtube.com/vi/iUwbQjs3P_s/0.jpg)](https://youtu.be/iUwbQjs3P_s)

## 👥 Team Members

- **John Doe** - Full Stack Developer (Authentication & Backend)
- **Jane Smith** - Frontend Developer (UI/UX & Playlist Management)
- **Alex Johnson** - Backend Developer (API Development & Database)

## ✨ Features

- 🔍 Real-time music search
- 🎵 Music playback with full player controls
- 📝 Playlist creation and management
- ❤️ Like/favorite songs
- 📱 Responsive design
- 🔐 Secure authentication with email verification

## 📧 Email Verification Process

1. **Registration**: 
   - User signs up with email and password
   - System sends verification email with confirmation link

2. **Email Confirmation**:
   - User checks their email and clicks the verification link
   - Link redirects to: `[your-site]/auth/confirm?token=[verification-token]`
   - Backend verifies the token and activates the account

3. **First Login**:
   - User can now log in with their credentials
   - Unverified accounts are restricted from certain features

## 🚀 Getting Started

### Prerequisites
- Node.js 16+
- npm or yarn
- Supabase account
- PostgreSQL database

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/music-platform.git
   cd music-platform
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn
   ```

3. Set up environment variables:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   DATABASE_URL=your_database_url
   ```

4. Run the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## 🔧 Technologies Used

- **Frontend**: Next.js, React, Tailwind CSS
- **Backend**: Next.js API Routes
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: Supabase Auth
- **Storage**: Supabase Storage

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
