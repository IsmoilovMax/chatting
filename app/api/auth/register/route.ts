import User from '@/database/user.model'
import { connectToDatabse } from '@/lib/mongoose'
import { NextResponse } from 'next/server'
import {hash} from "bcrypt"

export async function POST(req: Request) {
	try {
		await connectToDatabse()
		const { searchParams } = new URL(req.url)
		const step = searchParams.get('step') //api/auth/register?step=1

		if (step === '1') {
			const { email } = await req.json()
			const isExistingUser = await User.findOne({ email })

			if (isExistingUser) {
				return NextResponse.json({ error: 'Email already exists' }, { status: 400 })
			}

			return NextResponse.json({ success: true })

		}else if(step ==="2"){
			const {email, username, name, password} = await req.json()

			const isExistingUsername = await User.findOne({username})
			
			if(isExistingUsername) {
				return NextResponse.json(
					{error: "Username already exists"},
					{status: 400}
				)
			}

			const hashedPassword = await hash(password, 10) 
			const user = await User.create({
				email, username, name, password: hashedPassword
			})

			return NextResponse.json({success: true, user}) //res.status(200).json({success: true, user}) Next 13
		}

		
		const { email, password, username, name } = await req.json()
		await User.create({ email, password, username, name })
	} catch (error) {
		const result = error as Error
		return NextResponse.json({ error: result.message }, { status: 400 })
	}
}
