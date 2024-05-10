import { Document, Schema, model, models } from 'mongoose';


export interface IImage extends Document {
    title: string;
    transformationType: string;
    publicID: string;
    secureUrl: string;
    width?: number;
    height?: number;
    config?: object;
    transformationUrl?: string;
    aspectRation?: string;
    color?: string;
    prompt?: string;
    author: {
        _id: string;
        firstName: string;
        lastName: string;
    }
    createAt?: Date;
    updatedAt?: Date;
}



const ImageSchema = new Schema({
    title: { type: String, required: true },
    transformationType: { type: String, required: true },
    publicID: { type: String, required: true },
    secureUrl: { type: URL, required: true },
    width: { type: Number },
    height: { type: Number },
    config: { type: Object },
    transformationUrl: { type: URL },
    aspectRation: { type: String },
    color: { type: String },
    prompt: { type: String }, // prompt ที่ใช้ generate ภาพ
    author: { type: Schema.Types.ObjectId, ref: 'User' }, // author ของคนที่ทำการ generate ภาพ
    createAt: { type: Date, default: Date.now() },
    updatedAt: { type: Date, default: Date.now() }
});

const Image = models?.Image || model('Image',ImageSchema); // ตรวจสอบว่ามี model รูปอยู่แล้วมั้ย ถ้าไม่มีก็สร้าง model ใหม่ชื่อว่า 'Image' และ ImageSchema คือ schema ที่ใช้สำหรับการกำหนดโครงสร้างของข้อมูลในฐานข้อมูล MongoDB.

export default Image;




