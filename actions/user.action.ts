'use server'

import User from '@/database/user.model'
import { getServerSession } from 'next-auth'
import { authOptions } from '../lib/auth-options'
import { connectToDatabse } from '../lib/mongoose'


export async function getUserById(userId: string) {
	try {
		await connectToDatabse()
		const user = await User.findById(userId)
		const { currentUser }: any = await getServerSession(authOptions)

		const filteredUser = {
			_id: user?._id,
			name: user?.name,
			email: user?.email,
			coverImage: user?.coverImage,
			profileImage: user?.profileImage,
			username: user?.username,
			bio: user?.bio,
			location: user?.location,
			createdAt: user?.createdAt,
			followers: user?.follower?.length || 0,
			following: user?.following?.length || 0,
			isFollowing: user?.followers?.includes(currentUser._id) || false
		}

		return filteredUser
	} catch (error) {
		throw error
	}
}
