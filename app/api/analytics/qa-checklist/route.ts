import { NextResponse } from 'next/server';

export async function GET() {
  const checklist = [
    '🔒 Auth working across all roles?',
    '📲 QR redemption tested on mobile?',
    '🎁 Rewards unlock correctly?',
    '📊 Analytics CSV export functional?',
    '🌐 Campus filters show correct deals?',
    '🛑 No 401/429 auth or rate-limit errors?',
    '🧪 Last full QA sweep date updated?',
  ];

  return NextResponse.json({ checklist });
}
