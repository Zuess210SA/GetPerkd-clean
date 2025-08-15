// Quick test to check if we can get a real Supabase token from the frontend
console.log('Testing Supabase token extraction...')

// This will run in the browser console to get the actual token
const testCode = `
// Run this in your browser console (F12) while signed in:
const session = await window.supabase.auth.getSession()
console.log('Session:', session)
if (session.data.session) {
  console.log('Access Token:', session.data.session.access_token)
  console.log('User:', session.data.session.user.email)
  
  // Test API call with token
  const response = await fetch('/api/user/me', {
    headers: {
      'Authorization': 'Bearer ' + session.data.session.access_token
    }
  })
  console.log('API Response:', await response.json())
}
`

console.log('Copy and run this in your browser console:')
console.log(testCode)