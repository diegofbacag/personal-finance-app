import { supabase } from '@/lib/supabase'

interface ReviewActionInstanceDto {
  id: string
  title: string
  description: string
  completed_at: boolean
  created_at: string
  action_id: string
}

export const fetchMonthlyReviewActions = async (
  user_id: string,
): Promise<ReviewActionInstanceDto[]> => {
  const { data, error } = await supabase
    .from('review_action_instances')
    .select('*')
    .is('user_id', user_id)

  if (error) throw new Error(error.message)

  console.log('data', data)
  return data
}
