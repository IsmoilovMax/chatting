import { getUserById } from "@/actions/user.action"
import ProfileBio from "@/components/profile/profile-bio"
import ProfileHero from "@/components/profile/profile-hero"
import Header from "@/components/shared/header"
import PostFeed from "@/components/shared/post-feed"
import { authOptions } from "@/lib/auth-options"
import { getServerSession } from "next-auth"

interface Params {
    params: {
        userId: string
    }
}

const Page = async ({ params }: Params) => {
    const session: any = await getServerSession(authOptions);
    const user = await getUserById(params.userId);

    return (
        <>
            <Header label={user.name} isBack />
            <ProfileHero user={JSON.parse(JSON.stringify(user))} />
            <ProfileBio
                user={JSON.parse(JSON.stringify(user))}
                userId={JSON.parse(JSON.stringify(session)).currentUser._id}
            />
            <PostFeed userId={params.userId} user={JSON.parse(JSON.stringify(session.currentUser))} />

        </>
    )
}

export default Page
