import { post } from './fetch'
import { PostgrestError } from '@supabase/supabase-js'
import { definitions } from 'data/db/types'

const url = '/api/auth/anon'

//Create new anon user
export type CreateAuthUserResponse = { data: definitions['profiles']; error: PostgrestError }
export const createAnonUser = () => post<definitions['profiles']>({ url })
