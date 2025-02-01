import User from '@/database/user.model'
import { connectToDatabse } from '@/lib/mongoose'
import { NextResponse } from 'next/server'

export async function PUT(req: Request) {
	try {
		await connectToDatabse()
		const { userId, currentUserId } = await req.json()

		await User.findByIdAndUpdate(userId, {
			$push: { followers: currentUserId }
		})

		await User.findByIdAndUpdate(currentUserId, {
			$push: { following: userId }
		})

		return NextResponse.json({ message: 'Followed' })
	} catch (error) {
		const result = error as Error
		return NextResponse.json({ error: result.message }, { status: 400 })
	}
}

export async function DELETE(req: Request) {
	try {
		await connectToDatabse()
		const { userId, currentUserId } = await req.json()

		await User.findByIdAndUpdate(userId, {
			$pull: { followers: currentUserId }
		})

		await User.findByIdAndUpdate(currentUserId, {
			$pull: { following: userId }
		})
		return NextResponse.json({ message: 'Followed' })
	} catch (error) {
		const result = error as Error
		return NextResponse.json({ error: result.message }, { status: 400 })
	}
}

export async function GET(req: Request) {
	try {
		await connectToDatabse()
		const { searchParams } = new URL(req.url)
		const userId = searchParams.get('userId')
		const state = searchParams.get('state')

		const user = await User.findById(userId)

		if (state === 'following') {
			const following = await User.find({ _id: { $in: user.following } })
			return NextResponse.json(following)
		} else if (state === 'followers') {
			const followers = await User.find({ _id: { $in: user.followers } })
			return NextResponse.json(followers)
		}
	} catch (error) {
		const result = error as Error
		return NextResponse.json({ error: result.message }, { status: 400 })
	}
}
