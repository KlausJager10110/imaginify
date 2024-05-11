'use server';

import { revalidatePath } from "next/cache";
import { connectToDatabase } from "../database/mongoose";
import { handleError } from "../utils";
import User from "../database/models/user.model";
import Image from "../database/models/image.model";
import { redirect } from "next/navigation";


const populateUser = (query: any) => query.populate({
    path: 'author',
    model: User,
    select: '_id firstName lastName' 

})


// ADD IMAGE
export async function addImage({ image, userId, path } : AddImageParams) {
    try {
        await connectToDatabase();

        const author = await User.findById(userId); //เช็ค user จาก database
        if (!author) {
            throw new Error("User not found");
        }

        const newImage = await Image.create({ //สร้างภาพใหม่ [create]
            ...image, //spread operator เป็นการเอาคุณสมบัติทั้งหมดของ obj. นั้นๆ ใน js/ts
            author: author._id,
        })

        revalidatePath(path);

        return JSON.parse(JSON.stringify(newImage));

    } catch (error) {
        handleError(error)
    }
}

//UPDATE IMAGE
export async function updateImage({ image, userId, path } : UpdateImageParams) {
    try {
        await connectToDatabase();

        const imageToUpdate = await Image.findById(image._id); //หาภาพก่อน [findById]
        if (!imageToUpdate || imageToUpdate.author.toHexString() !== userId) { // เช็คว่าไม่มีรูปนั้น และค่าของ author ในเอกสารนั้นเป็นของผู้ใช้ที่เข้าสู่ระบบหรือไม่ โดยเปรียบเทียบ author กับ userId ที่เป็น ObjectID ของผู้ใช้ที่เข้าสู่ระบบ [toHexString() : ใช้แปลง ObjectID ให้เป็นสตริงในรูปแบบฐานสิบหก]
            throw new Error('Unauthorized or image not found');
        }

        const updatedImage = await Image.findByIdAndUpdate(
            imageToUpdate._id,
            image, 
            { new: true }
        ); //แก้ไขภาพ [findByIdAndUpdate]

        revalidatePath(path);

        return JSON.parse(JSON.stringify(updatedImage));

    } catch (error) {
        handleError(error)
    }
}

// DELETE IMAGE
export async function deleteImage( imageId: string) {
    try {
        await connectToDatabase();

        await Image.findByIdAndDelete(imageId)
    } catch (error) {
        handleError(error)
    } finally {
        redirect('/')
    }
}

// GET IMAGE
export async function getImageById(imageId: string) {
    try {
        await connectToDatabase();

        const image = await populateUser(Image.findById(imageId)) // func populateUser ทำให้เราได้ข้อมูลของผู้สร้างมันมาด้วย

        if (!image) {
            throw new Error('Image not found');
        }

        return JSON.parse(JSON.stringify(image));

    } catch (error) {
        handleError(error)
    }
}


