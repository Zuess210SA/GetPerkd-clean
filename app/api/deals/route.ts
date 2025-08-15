import { NextResponse } from 'next/server'

// Sample deals data with proper image handling
const sampleDeals = [
  {
    id: 1,
    title: "Study Session Special",
    title_en: "Study Session Special",
    description: "20% off all study materials",
    description_en: "20% off all study materials", 
    category: "Education",
    discount_percentage: 20,
    business_name: "FitLife Gym",
    image_url: null, // Will use gradient fallback
  },
  {
    id: 2,
    title: "Coffee & Pastry Combo",
    title_en: "Coffee & Pastry Combo",
    description: "Buy any coffee and get a pastry for 50% off",
    description_en: "Buy any coffee and get a pastry for 50% off",
    category: "Food & Dining", 
    discount_percentage: 50,
    business_name: "Tony's Pizza Palace",
    image_url: null, // Will use gradient fallback
  },
  {
    id: 3,
    title: "Late Night Snack Deal",
    title_en: "Late Night Snack Deal", 
    description: "Free drink with any late night snack purchase",
    description_en: "Free drink with any late night snack purchase",
    category: "Food & Dining",
    discount_percentage: 25,
    business_name: "Tony's Pizza Palace", 
    image_url: null, // Will use gradient fallback
  },
  {
    id: 4,
    title: "Gym Membership Discount",
    title_en: "Gym Membership Discount",
    description: "15% off first month membership for students",
    description_en: "15% off first month membership for students",
    category: "Fitness",
    discount_percentage: 15,
    business_name: "Campus Fitness Center",
    image_url: null, // Will use gradient fallback
  },
  {
    id: 5,
    title: "Movie Night Special",
    title_en: "Movie Night Special",
    description: "Buy one ticket, get one 30% off every Tuesday",
    description_en: "Buy one ticket, get one 30% off every Tuesday", 
    category: "Entertainment",
    discount_percentage: 30,
    business_name: "Santikos Theatres",
    image_url: null, // Will use gradient fallback
  },
  {
    id: 6,
    title: "Textbook Trade-In",
    title_en: "Textbook Trade-In",
    description: "Get extra credit for used textbook trade-ins",
    description_en: "Get extra credit for used textbook trade-ins",
    category: "Education", 
    discount_percentage: 40,
    business_name: "Campus Bookstore",
    image_url: null, // Will use gradient fallback
  }
]

export async function GET(request: Request) {
  try {
    // Simulate slight delay for realistic API behavior
    await new Promise(resolve => setTimeout(resolve, 100))
    
    return NextResponse.json({
      success: true,
      deals: sampleDeals,
      count: sampleDeals.length
    })
  } catch (error) {
    console.error('Error fetching deals:', error)
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to fetch deals',
        deals: []
      },
      { status: 500 }
    )
  }
}