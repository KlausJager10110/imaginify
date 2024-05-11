'use client';


import React from "react"
import { useToast } from "../ui/use-toast"
import { CldImage, CldUploadWidget } from 'next-cloudinary'
import Image from "next/image";
import { dataUrl, getImageSize } from "@/lib/utils";
import { PlaceholderValue } from "next/dist/shared/lib/get-img-props";



type MediaUploaderProps = { //เป็นการสร้างประเภทตัวแปรใหม่
    onValueChange: (value: string) => void;
    setImage: React.Dispatch<any>; // เป็นประเภท state ของ react
    publicId: string; 
    image: any,
    type: any;
}


const MediaUploader = ({ 
    onValueChange, 
    setImage,
    image,
    publicId,
    type,
} : MediaUploaderProps) => {

    const { toast } = useToast()

    const onUploadSuccessHandler = (result: any) => {
        setImage((prevState: any) => ({
            ...prevState,
            publicId: result?.info?.public_id,
            width: result?.info?.width,
            height: result?.info?.height,
            secureURL: result?.info?.secure_url,  //เคยเจอปัญหาตรงนี้ ในส่วน fontend ใช้ secureUrl แต่ backend ใช้ secureURL ต้องใช้ให้ตรงกัน****สำคัญมาก
        }))

        onValueChange(result?.info?.public_id) // update public id
        
        toast({
            title: 'Image uploaded successfully.',
            description: '1 credit was dedicated from your account.',
            duration: 5000,
            className: 'success-toast',
        })
    }
    const onUploadErrorHandler = () => {
        toast({
            title: 'Somethig went wrong while uploading.',
            description: 'Please try again.',
            duration: 5000,
            className: 'error-toast',
        })
    }

    return (
        <CldUploadWidget
            uploadPreset="jsm_imaginify" //ชื่อต้องตรงกับตอนที่ตั้ง preset บนเว็บของ cloudinary
            options={{
                multiple: false,
                resourceType: "image",
            }}
            onSuccess={onUploadSuccessHandler}
            onError={onUploadErrorHandler}
        >
            {({ open }) => (
                <div className="flex flex-col gap-4">
                    <h3 className="h3-bold text-dark-600">
                        Original
                    </h3>
                    {publicId ? (
                        <>
                            <div className="cursor-pointer overflow-hidden rounded-[10px]">
                                <CldImage 
                                    width={getImageSize(type, image, "width")}
                                    height={getImageSize(type, image, "height")}
                                    src={publicId}
                                    alt="image"
                                    sizes={"(max-width: 767px) 100vw, 50vw"}
                                    placeholder={dataUrl as PlaceholderValue}
                                    className="media-uploader_cldImage"
                                />
                            </div>
                        </>
                    ) : (
                        // cta = call to action
                        <div className="media-uploader_cta" onClick={() => open()}> 
                            <div className="media-uploader_cta-image">
                                <Image 
                                    src='/assets/icons/add.svg'
                                    alt='add image'
                                    width={24}
                                    height={24}
                                />
                            </div>
                            <p className="p-14-medium">Click here to upload image</p>
                        </div>
                    )}
                </div>
            )}
        </CldUploadWidget>
    )
}

export default MediaUploader