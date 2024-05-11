import { Document, Schema, model, models } from 'mongoose';


export interface IImage extends Document {
    title: string;
    transformationType: string;
    publicId: string;
    secureURL: string; //เคยเจอปัญหาตรงนี้ ในส่วน fontend ใช้ secureUrl แต่ backend ใช้ secureURL ต้องใช้ให้ตรงกัน****สำคัญมาก
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
    publicId: { type: String, required: true },
    secureURL: { type: String, required: true },  //เคยเจอปัญหาตรงนี้ ในส่วน fontend ใช้ secureUrl แต่ backend ใช้ secureURL ต้องใช้ให้ตรงกัน****สำคัญมาก
    width: { type: Number },
    height: { type: Number },
    config: { type: Object },
    transformationUrl: { type: String },
    aspectRation: { type: String },
    color: { type: String },
    prompt: { type: String }, // prompt ที่ใช้ generate ภาพ
    author: { type: Schema.Types.ObjectId, ref: 'User' }, // author ของคนที่ทำการ generate ภาพ
    createAt: { type: Date, default: Date.now() },
    updatedAt: { type: Date, default: Date.now() }
});

const Image = models?.Image || model('Image',ImageSchema); // ตรวจสอบว่ามี model รูปอยู่แล้วมั้ย ถ้าไม่มีก็สร้าง model ใหม่ชื่อว่า 'Image' และ ImageSchema คือ schema ที่ใช้สำหรับการกำหนดโครงสร้างของข้อมูลในฐานข้อมูล MongoDB.

export default Image;




