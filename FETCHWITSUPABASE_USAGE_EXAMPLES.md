# fetchWithSupabase Usage Guide

## Quick Implementation

The secure fetch helper is now available at `client/src/lib/fetchWithSupabase.ts`:

```typescript
import { fetchWithToken } from "@/lib/fetchWithSupabase";

// GET request
const userData = await fetchWithToken('/api/users/1/stats');

// POST request with body
const newDeal = await fetchWithToken('/api/deals', 'POST', {
  title: 'New Deal',
  discount: 20
});

// PUT request
const updatedUser = await fetchWithToken('/api/users/1', 'PUT', {
  name: 'John Doe'
});
```

## Key Features

✅ **Automatic Token Handling**: Reads `supabase_token` from localStorage  
✅ **Proper Authorization**: Adds `Bearer ${token}` header when token exists  
✅ **401 Detection**: Logs unauthorized responses for debugging  
✅ **Clean API**: Simple method signature matching your specification  

## Integration Status

- ✅ `fetchWithSupabase.ts` created with your exact specification
- ✅ Enhanced version with error handling available
- ✅ Works with existing authentication system
- ✅ Compatible with current token storage pattern

## Example Usage in Components

```typescript
// In a React component
import { fetchWithToken } from "@/lib/fetchWithSupabase";

const handleSaveDeal = async () => {
  try {
    const result = await fetchWithToken('/api/saved-deals', 'POST', {
      dealId: deal.id
    });
    console.log('Deal saved:', result);
  } catch (error) {
    console.error('Failed to save deal:', error);
  }
};
```

The utility is ready for immediate use in your authentication-required API calls.