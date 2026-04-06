import { supabase } from '@/lib/supabase'

interface ReviewActionInstanceDto {
  id: string
  title: string
  description: string
  completed_at: boolean
  created_at: string
  action_id: string
}

export const fetchMonthlyReviewActions = async (): Promise<
  ReviewActionInstanceDto[]
> => {
  const { data, error } = await supabase
    .from('review_action_instances')
    .select('*')

  if (error) throw new Error(error.message)

  return data
}
