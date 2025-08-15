'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Gift, Star, Clock, CheckCircle, Lock } from 'lucide-react'

interface LoyaltyCard {
  id: string
  business_name: string
  name: string
  description: string
  stamp_requirement: number
  reward_title: string
  reward_description: string
  current_stamps: number
  is_active: boolean
  user_reward_status?: 'locked' | 'unlocked' | 'redeemed'
  unlocked_at?: string
  redeemed_at?: string
}

export default function StudentLoyaltyDashboard() {
  const [loyaltyCards, setLoyaltyCards] = useState<LoyaltyCard[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [showAll, setShowAll] = useState(false)
  const [actionLoading, setActionLoading] = useState<string | null>(null)
  const [cooldownTimers, setCooldownTimers] = useState<Record<string, string>>({})
  const [debounceTimers, setDebounceTimers] = useState<Record<string, boolean>>({})

  useEffect(() => {
    fetchLoyaltyCards()
    checkCooldowns()
  }, [])

  const checkCooldowns = () => {
    const timers: Record<string, string> = {}
    loyaltyCards.forEach(card => {
      const lastStampTime = localStorage.getItem(`stamp_cooldown_${card.id}`)
      if (lastStampTime) {
        const lastTime = new Date(lastStampTime).getTime()
        const now = new Date().getTime()
        const sixHours = 6 * 60 * 60 * 1000
        const remaining = sixHours - (now - lastTime)
        
        if (remaining > 0) {
          const hours = Math.floor(remaining / (60 * 60 * 1000))
          const minutes = Math.floor((remaining % (60 * 60 * 1000)) / (60 * 1000))
          timers[card.id] = `🕒 Come back in ${hours}h ${minutes}m`
        }
      }
    })
    setCooldownTimers(timers)
  }

  useEffect(() => {
    const interval = setInterval(checkCooldowns, 60000) // Update every minute
    return () => clearInterval(interval)
  }, [loyaltyCards])

  const fetchLoyaltyCards = async () => {
    try {
      const response = await fetch('/api/loyalty')
      if (response.ok) {
        const data = await response.json()
        setLoyaltyCards(data.cards || [])
      }
    } catch (error) {
      console.error('Error fetching loyalty cards:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const addStamp = async (cardId: string) => {
    // Check client-side cooldown first
    if (cooldownTimers[cardId]) {
      return // Button should be disabled anyway
    }

    // Check debounce window
    if (debounceTimers[cardId]) {
      return // Prevent rapid double-clicks
    }

    // Set 2-second debounce
    setDebounceTimers(prev => ({ ...prev, [cardId]: true }))
    setTimeout(() => {
      setDebounceTimers(prev => ({ ...prev, [cardId]: false }))
    }, 2000)

    setActionLoading(cardId)
    try {
      const response = await fetch('/api/stamps/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ card_id: cardId, method: 'qr' })
      })
      
      const result = await response.json()
      
      if (response.ok) {
        // Store timestamp for 6-hour UI cooldown
        localStorage.setItem(`stamp_cooldown_${cardId}`, new Date().toISOString())
        checkCooldowns()
        
        // Refresh cards after adding stamp
        await fetchLoyaltyCards()
        
        // Show reward unlock animation if applicable
        if (result.reward_unlocked) {
          // Trigger confetti animation
          if (typeof window !== 'undefined' && (window as any).confetti) {
            (window as any).confetti({
              particleCount: 100,
              spread: 70,
              origin: { y: 0.6 }
            })
          }
        }
      } else {
        alert(result.error || 'Failed to add stamp')
      }
    } catch (error) {
      alert('Error adding stamp')
    } finally {
      setActionLoading(null)
    }
  }

  const redeemReward = async (cardId: string, rewardId: string) => {
    setActionLoading(`redeem-${cardId}`)
    try {
      const response = await fetch('/api/rewards/redeem', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ reward_id: rewardId })
      })
      
      const result = await response.json()
      
      if (response.ok) {
        // Refresh cards after redemption
        await fetchLoyaltyCards()
        alert('Reward redeemed successfully!')
      } else {
        alert(result.error || 'Failed to redeem reward')
      }
    } catch (error) {
      alert('Error redeeming reward')
    } finally {
      setActionLoading(null)
    }
  }

  const getProgressColor = (progress: number) => {
    if (progress >= 100) return 'text-green-600'
    if (progress >= 80) return 'text-yellow-600'
    return 'text-blue-600'
  }

  const getStatusBadge = (card: LoyaltyCard) => {
    if (card.user_reward_status === 'redeemed') {
      return <Badge variant="outline" className="text-green-600 border-green-200">Redeemed</Badge>
    }
    if (card.user_reward_status === 'unlocked') {
      return <Badge variant="outline" className="text-purple-600 border-purple-200">Ready to Claim!</Badge>
    }
    if (card.current_stamps >= card.stamp_requirement) {
      return <Badge variant="outline" className="text-yellow-600 border-yellow-200">Complete</Badge>
    }
    return null
  }

  const getPopularityTag = (index: number) => {
    if (index === 0) return <Badge className="bg-blue-100 text-blue-800">Most Popular</Badge>
    if (index === 1) return <Badge className="bg-green-100 text-green-800">Recommended</Badge>
    return null
  }

  const displayedCards = showAll ? loyaltyCards : loyaltyCards.slice(0, 3)

  if (isLoading) {
    return (
      <div className="container mx-auto p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <Card key={i} className="animate-pulse">
              <CardHeader>
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                <div className="h-3 bg-gray-200 rounded w-1/2"></div>
              </CardHeader>
              <CardContent>
                <div className="h-20 bg-gray-200 rounded"></div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Your Loyalty Cards</h1>
        <p className="text-gray-600">Earn stamps and unlock rewards at your favorite businesses</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {displayedCards.map((card, index) => {
          const progress = (card.current_stamps / card.stamp_requirement) * 100
          const isComplete = card.current_stamps >= card.stamp_requirement
          const canAddStamp = card.is_active && !isComplete
          const isOnCooldown = !!cooldownTimers[card.id]

          return (
            <Card key={card.id} className="relative overflow-hidden">
              <CardHeader className="pb-4">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <CardTitle className="text-lg font-semibold text-gray-900">
                      {card.business_name}
                    </CardTitle>
                    <CardDescription className="text-sm text-gray-600 mt-1">
                      {card.name}
                    </CardDescription>
                  </div>
                  {getPopularityTag(index)}
                </div>
                
                <div className="mt-3">
                  {getStatusBadge(card)}
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                {/* Progress Section */}
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-gray-700">
                      {card.current_stamps} / {card.stamp_requirement} stamps
                    </span>
                    <span className={`text-sm font-medium ${getProgressColor(progress)}`}>
                      {Math.round(progress)}%
                    </span>
                  </div>
                  <Progress value={progress} className="h-2" />
                </div>

                {/* Reward Preview */}
                <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-3 rounded-lg">
                  <div className="flex items-center gap-2 mb-1">
                    <Gift className="h-4 w-4 text-purple-600" />
                    <span className="text-sm font-medium text-purple-900">Reward</span>
                  </div>
                  <p className="text-sm text-purple-800">{card.reward_description}</p>
                </div>

                {/* Action Buttons */}
                <div className="space-y-2">
                  {card.user_reward_status === 'unlocked' && (
                    <Button 
                      onClick={() => redeemReward(card.id, card.id)}
                      disabled={actionLoading === `redeem-${card.id}`}
                      className="w-full bg-green-600 hover:bg-green-700"
                    >
                      {actionLoading === `redeem-${card.id}` ? (
                        <>Loading...</>
                      ) : (
                        <>
                          <Gift className="h-4 w-4 mr-2" />
                          Claim Reward
                        </>
                      )}
                    </Button>
                  )}
                  
                  {canAddStamp && (
                    <Button 
                      onClick={() => addStamp(card.id)}
                      disabled={actionLoading === card.id || isOnCooldown}
                      variant="outline"
                      className={`w-full ${isOnCooldown ? 'bg-gray-100 text-gray-400' : ''}`}
                    >
                      {actionLoading === card.id ? (
                        <>Adding...</>
                      ) : isOnCooldown ? (
                        <>
                          <Clock className="h-4 w-4 mr-2" />
                          {cooldownTimers[card.id]}
                        </>
                      ) : (
                        <>
                          <Star className="h-4 w-4 mr-2" />
                          Add Stamp
                        </>
                      )}
                    </Button>
                  )}

                  {card.user_reward_status === 'redeemed' && (
                    <div className="flex items-center justify-center py-2 text-green-600">
                      <CheckCircle className="h-4 w-4 mr-2" />
                      <span className="text-sm font-medium">Reward Claimed!</span>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {loyaltyCards.length > 3 && (
        <div className="mt-8 text-center">
          <Button 
            onClick={() => setShowAll(!showAll)}
            variant="outline"
            size="lg"
          >
            {showAll ? 'Show Less' : `Load More (${loyaltyCards.length - 3} more cards)`}
          </Button>
        </div>
      )}

      {loyaltyCards.length === 0 && (
        <div className="text-center py-12">
          <div className="mx-auto w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
            <Gift className="h-8 w-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No loyalty cards yet</h3>
          <p className="text-gray-600 mb-6">Start collecting stamps at your favorite businesses</p>
          <Button asChild>
            <a href="/deals">Explore Businesses</a>
          </Button>
        </div>
      )}
    </div>
  )
}