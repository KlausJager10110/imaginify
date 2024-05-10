//serverless Architecture;


import mongoose, { Mongoose } from "mongoose";



const MONGODB_URL = process.env.MONGODB_URL;

interface MongooseConnection {
    conn: Mongoose | null;
    promise: Promise<Mongoose> | null;

}

let cached: MongooseConnection = (global as any).mongoose //เก็ปเป็นแคชไว้ใช้ จะได้ไม่ต้องไปขอ server บ่อยๆ


// พอเปิดไฟล์ครั้งแรก ก็คือไม่มีข้อมูลแคชมาก่อน
if (!cached) {
    cached = (global as any).mongoose = {
        conn: null,
        promise: null,
    }
}


export const connectToDatabase = async() => {
    if(cached.conn) return cached.conn; // ตรวจว่ามีแคชอยู่แล้วมั้ยถ้ามีก็ return ออกได้เลย

    if(!MONGODB_URL) throw new Error("Missing MONGODB_URL is not defined!"); //ตรงนี้คือถ้าไม่มีแคชก็ให้เชื่อมต่อ database ใหม่

    //หากไม่มีการแคชให้สร้างแคชใหม่ (มั้ง)
    cached.promise = cached.promise || mongoose.connect(MONGODB_URL, { dbName: 'Imaginify', bufferCommands: false })

    cached.conn = await cached.promise;

    return cached.conn;
}