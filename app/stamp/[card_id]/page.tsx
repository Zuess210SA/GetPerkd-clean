'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"
import confetti from 'canvas-confetti'
import { Gift, Pizza, Coffee, GraduationCap, Star, CheckCircle, XCircle } from 'lucide-react'
import type { AddStampResponse } from '../../../client/src/types/loyalty'

export default function QRStampPage() {
  const params = useParams()
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [result, setResult] = useState<AddStampResponse | null>(null)
  const [error, setError] = useState<string | null>(null)
  const { toast } = useToast()

  const cardId = params.card_id as string

  useEffect(() => {
    if (!cardId) return

    const addStampViaQR = async () => {
      try {
        const response = await fetch(`/api/stamps/${cardId}`)
        const data: AddStampResponse = await response.json()

        if (!response.ok) {
          throw new Error(data.message || 'Failed to add stamp')
        }

        setResult(data)

        if (data.success) {
          // Show success toast
          toast({
            title: "Stamp Added Successfully!",
            description: data.message,
          })

          // Trigger confetti if reward unlocked
          if (data.reward_unlocked) {
            confetti({
              particleCount: 150,
              spread: 100,
              origin: { y: 0.6 }
            })
          }
        }
      } catch (err: any) {
        setError(err.message)
        toast({
          title: "Error",
          description: err.message,
          variant: "destructive",
        })
      } finally {
        setLoading(false)
      }
    }

    addStampViaQR()
  }, [cardId, toast])

  const getIcon = (success: boolean) => {
    if (success) {
      return <CheckCircle className="h-16 w-16 text-green-500" />
    }
    return <XCircle className="h-16 w-16 text-red-500" />
  }

  const getBusinessIcon = () => {
    return <Star className="h-8 w-8 text-blue-500" />
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardContent className="p-8 text-center">
            <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4" />
            <h2 className="text-xl font-semibold mb-2">Processing Stamp...</h2>
            <p className="text-gray-600">Please wait while we add your stamp.</p>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-lg">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            {getIcon(result?.success || false)}
          </div>
          <CardTitle className="text-2xl">
            {result?.success ? 'Stamp Added!' : 'Stamp Failed'}
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-6">
          {result?.success ? (
            <>
              <div className="text-center space-y-2">
                <p className="text-lg text-gray-700">{result.message}</p>
                <div className="flex items-center justify-center space-x-2 text-sm text-gray-600">
                  {getBusinessIcon()}
                  <span>Stamp #{result.new_stamp_count}</span>
                </div>
              </div>

              {result.reward_unlocked && result.reward_id && (
                <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-center">
                  <Gift className="h-8 w-8 text-green-600 mx-auto mb-2" />
                  <h3 className="font-semibold text-green-800 mb-2">Reward Unlocked!</h3>
                  <p className="text-green-700 text-sm">
                    Congratulations! You've earned a new reward. Check your loyalty dashboard to claim it.
                  </p>
                </div>
              )}

              <div className="flex space-x-3">
                <Button
                  onClick={() => router.push('/student/loyalty')}
                  className="flex-1"
                >
                  View My Cards
                </Button>
                <Button
                  variant="outline"
                  onClick={() => router.push('/')}
                  className="flex-1"
                >
                  Back to Deals
                </Button>
              </div>
            </>
          ) : (
            <>
              <div className="text-center space-y-2">
                <p className="text-lg text-red-700">
                  {error || 'Something went wrong while adding your stamp.'}
                </p>
                {result?.cooldown_expires && (
                  <p className="text-sm text-gray-600">
                    You can add another stamp after {new Date(result.cooldown_expires).toLocaleTimeString()}
                  </p>
                )}
              </div>

              <div className="flex space-x-3">
                <Button
                  variant="outline"
                  onClick={() => router.push('/student/loyalty')}
                  className="flex-1"
                >
                  My Loyalty Cards
                </Button>
                <Button
                  onClick={() => router.push('/')}
                  className="flex-1"
                >
                  Back to Deals
                </Button>
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  )
}