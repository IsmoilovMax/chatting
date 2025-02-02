import fetcher from '@/lib/fetchet'
import useSWR from 'swr'

const usePosts = () => {
	const { data, error, isLoading, mutate } = useSWR(`/api/posts?limit=20`, fetcher)
	return {
		data,
		isLoading,
		isError: error,
		mutate
	}
}
export default usePosts
