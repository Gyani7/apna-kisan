'use client'
import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Leaf } from 'lucide-react'
import type { FarmingTipRow } from '@/lib/database.types'
import { createSupabaseClient } from '@/lib/supabase/client'

const supabase = createSupabaseClient();

export function FarmingTipsCard() {
  const [tip, setTip] = useState<FarmingTipRow | null>(null)

  useEffect(() => {
    const fetchRandomTip = async () => {
      const { data, error } = await supabase.rpc('get_random_farming_tip')
      if (error) {
        console.error('Error fetching farming tip:', error)
      } else {
        setTip(data[0])
      }
    }

    fetchRandomTip()
  }, [])

  if (!tip) {
    return null
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{tip.title}</CardTitle>
        <Leaf className="w-8 h-8 text-green-500" />
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">{tip.content}</p>
      </CardContent>
    </Card>
  )
}