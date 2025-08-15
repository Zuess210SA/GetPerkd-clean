'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { useRouter } from 'next/navigation'
import { GraduationCap, Users, MapPin } from 'lucide-react'

interface University {
  id: string
  name: string
  shortName: string
  type: 'public' | 'private' | 'community' | 'health' | 'trade'
  studentCount: number
  location: string
  primaryColor: string
  secondaryColor: string
}

const universities: University[] = [
  {
    id: 'utsa',
    name: 'University of Texas at San Antonio',
    shortName: 'UTSA',
    type: 'public',
    studentCount: 34000,
    location: 'San Antonio, TX',
    primaryColor: '#FF6600',
    secondaryColor: '#003366'
  },
  {
    id: 'txst',
    name: 'Texas State University',
    shortName: 'Texas State',
    type: 'public',
    studentCount: 38000,
    location: 'San Marcos, TX',
    primaryColor: '#501214',
    secondaryColor: '#FFCC33'
  },
  {
    id: 'ut',
    name: 'University of Texas at Austin',
    shortName: 'UT Austin',
    type: 'public',
    studentCount: 51000,
    location: 'Austin, TX',
    primaryColor: '#BF5700',
    secondaryColor: '#FFFFFF'
  },
  {
    id: 'sac',
    name: 'San Antonio College',
    shortName: 'SAC',
    type: 'community',
    studentCount: 20000,
    location: 'San Antonio, TX',
    primaryColor: '#003366',
    secondaryColor: '#FF6600'
  },
  {
    id: 'nwv',
    name: 'Northwest Vista College',
    shortName: 'NW Vista',
    type: 'community',
    studentCount: 17000,
    location: 'San Antonio, TX',
    primaryColor: '#006633',
    secondaryColor: '#CCCCCC'
  },
  {
    id: 'stmu',
    name: "St. Mary's University",
    shortName: "St. Mary's",
    type: 'private',
    studentCount: 2400,
    location: 'San Antonio, TX',
    primaryColor: '#003366',
    secondaryColor: '#FFCC33'
  }
]

export default function UniversityCardsPage() {
  const [selectedUniversity, setSelectedUniversity] = useState<string | null>(null)
  const router = useRouter()

  const handleSelectUniversity = (universityId: string) => {
    setSelectedUniversity(universityId)
    // Store selection and redirect to main app
    localStorage.setItem('selectedUniversity', universityId)
    router.push('/')
  }

  const getTypeColor = (type: University['type']) => {
    switch (type) {
      case 'public': return 'bg-blue-100 text-blue-800'
      case 'private': return 'bg-purple-100 text-purple-800'
      case 'community': return 'bg-green-100 text-green-800'
      case 'health': return 'bg-red-100 text-red-800'
      case 'trade': return 'bg-orange-100 text-orange-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Choose Your Institution
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Select your university or college to get personalized deals and offers in your area.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {universities.map((university) => (
            <Card 
              key={university.id}
              className="cursor-pointer transition-all duration-200 hover:shadow-lg hover:scale-105 border-2 hover:border-blue-500"
              onClick={() => handleSelectUniversity(university.id)}
            >
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between mb-2">
                  <GraduationCap 
                    className="h-8 w-8" 
                    style={{ color: university.primaryColor }}
                  />
                  <Badge className={getTypeColor(university.type)}>
                    {university.type}
                  </Badge>
                </div>
                <CardTitle className="text-xl font-bold leading-tight">
                  {university.name}
                </CardTitle>
                <CardDescription className="text-gray-600 dark:text-gray-400">
                  {university.shortName}
                </CardDescription>
              </CardHeader>
              
              <CardContent className="pt-0">
                <div className="space-y-3">
                  <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                    <Users className="h-4 w-4 mr-2" />
                    {university.studentCount.toLocaleString()} students
                  </div>
                  <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                    <MapPin className="h-4 w-4 mr-2" />
                    {university.location}
                  </div>
                </div>
                
                <Button 
                  className="w-full mt-4"
                  style={{ 
                    backgroundColor: university.primaryColor,
                    color: 'white'
                  }}
                >
                  Select {university.shortName}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Don't see your institution? <Button variant="link" className="p-0 h-auto">Contact us</Button> to add it.
          </p>
        </div>
      </div>
    </div>
  )
}