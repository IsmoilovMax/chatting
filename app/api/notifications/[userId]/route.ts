import Notification from '@/database/notification.model'
import User from '@/database/user.model'
import { connectToDatabse } from '@/lib/mongoose'
import { NextResponse } from 'next/server'

export async function GET(req: Request, route: { params: { userId: string } }) {
	try {
		await connectToDatabse()
		const { userId } = route.params

		const notification = await Notification.find({ user: userId }).sort({ createdAt: -1 })

		await User.findByIdAndUpdate(userId, {
			$set: { hasNewNotifications: false }
		})

		return NextResponse.json(notification)
	} catch (error) {
		const result = error as Error
		return NextResponse.json({ error: result.message }, { status: 400 })
	}
}

export async function DELETE(req: Request, route: { params: { userId: string } }) {
	try {
		await connectToDatabse()
		const { userId } = route.params

		await Notification.deleteMany({ user: userId })

		await User.findByIdAndUpdate(userId, { $set: { hasNewNotifications: false } }, { new: true })

		return NextResponse.json({ message: 'Notifications deleted' })
	} catch (error) {
		const result = error as Error
		return NextResponse.json({ error: result.message }, { status: 400 })
	}
}
