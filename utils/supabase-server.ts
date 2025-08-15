import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'

export const createClient = async () => {
  const cookieStore = await cookies()
  return createServerComponentClient({ cookies: () => cookieStore })
}