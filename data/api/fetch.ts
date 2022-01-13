import { ApiError } from '@supabase/supabase-js'
import { objectToParams } from 'lib/urlEncoder'

export type WithError<T> = { data: T; error: ApiError }
type RequestProps<T> = T & {
  url: string
}

export const get = <T = any>({
  url,
  params,
}: RequestProps<{ params?: Object }>): Promise<WithError<T>> =>
  fetch(url + objectToParams(params)).then(res => res.json())

export const post = <T = any>({
  url,
  body,
}: RequestProps<{ body: Object }>): Promise<WithError<T>> =>
  fetch(url, {
    method: 'POST',
    body: JSON.stringify(body),
  }).then(res => res.json())

export const _delete = <T = any>({
  url,
  params,
}: RequestProps<{ params: Object }>): Promise<WithError<T>> =>
  fetch(url + objectToParams(params), {
    method: 'DELETE',
  }).then(res => res.json())
