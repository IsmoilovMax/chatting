import Post from '@/database/post.model'
import User from '@/database/user.model'
import { connectToDatabse } from '@/lib/mongoose'
import { NextResponse } from 'next/server'

export async function GET(req: Request, route: { params: { postId: string } }) {
	try {
		await connectToDatabse()
		const { postId } = route.params

		const post = await Post.findById(postId).populate({
			path: 'user',
			model: User,
			select: 'name email  _id username'
		})

		return NextResponse.json(post)
	} catch (error) {
		const result = error as Error
		return NextResponse.json({ error: result.message }, { status: 400 })
	}
}
