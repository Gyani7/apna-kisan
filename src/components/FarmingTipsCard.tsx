'use client'
import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Leaf } from 'lucide-react'
import { Database } from '@/lib/database.types'
import { createSupabaseClient } from '@/lib/supabase/client'

const supabase = createSupabaseClient();

export function FarmingTipsCard() {
  const [tip, setTip] = useState<Database['public']['Tables']['farming_tips']['Row'] | null>(null)

  useEffect(() => {
    const fetchRandomTip = async () => {
      const { data, error } = await supabase.rpc('get_random_farming_tip')
      if (error) {
        console.error('Error fetching farming tip:', error)
      } else if (data && data.length > 0) {
        setTip(data[0])
      } else {
        // Set a fallback tip if no tip is returned from the database
        setTip({
          id: 0,
          title: 'No tips available',
          content: 'Please check back later for farming tips.',
          is_active: false,
          created_at: new Date().toISOString(),
        });
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