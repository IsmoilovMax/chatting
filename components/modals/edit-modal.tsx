"use client"

import useEditModal from "@/hooks/useEditModal"
import { IUser } from "@/types"
import axios from "axios"
import { Loader2 } from "lucide-react"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import CoverImageUpload from "../shared/cover-image-upload"
import EditForm from "../shared/edit-form"
import ProfileImageUpload from "../shared/profile-image-upload"
import Modal from "../ui/modal"


interface Props {
    user: IUser
}



const EditModal = ({ user }: Props) => {
    const [coverImage, setCoverImage] = useState("")
    const [profileImage, setProfileImage] = useState("")
    const [isLoading, setIsLoading] = useState(false)

    const editModal = useEditModal()
    const router = useRouter()

    useEffect(() => {
        setCoverImage(user.coverImage)
        setProfileImage(user.profileImage)
    }, [user])

    const handleimageUpload = async (image: string, isProfileImage: boolean) => {
        try {
            setIsLoading(true)
            await axios.put(`/api/users/${user._id}`, {
                [isProfileImage ? "profileImage" : "coverImage"]: image
            })
            router.refresh()
            setIsLoading(false)
        } catch (error) {
            setIsLoading(false)
        }
    }

    const bodyContent = (
        <>
            {isLoading && (
                <div className="absolute z-10 h-[300px] bg-black opacity-50 left-0 top-12 right-0 flex justify-center items-center">
                    <Loader2 className="animate-spin text-sky-500" />
                </div>
            )}
            <CoverImageUpload
                coverImage={coverImage}
                onChange={(image) => handleimageUpload(image, false)}
            />
            <ProfileImageUpload
                profileImage={profileImage}
                onChange={(image) => handleimageUpload(image, true)}
            />

            <EditForm user={user} />
        </>
    )

    return (
        <Modal
            body={bodyContent}
            isOpen={editModal.isOpen}
            onClose={editModal.onClose}
            isEditing
        />
    )
}

export default EditModal
