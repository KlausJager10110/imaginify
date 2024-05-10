import Header from '@/components/shared/Header'
import React from 'react'
import { transformationTypes } from '@/constants'
import TransformationForm from '@/components/shared/TransformationForm';
import { auth } from '@clerk/nextjs/server';
import { getUserById } from '@/lib/actions/user.actions';
import { redirect } from 'next/navigation';

const AddTransformationTypePage = async ({ params: { type } } : SearchParamProps) => {

  const { userId } = auth(); //รับ userId มาจาก clerk
  const transformation = transformationTypes[type];

  if(!userId) redirect('/sign-in'); //ถ้าไม่มี userId ให้กลับไปหน้า sign in ...เอามาแก้ปัญหาบันทัดล่าง [ถ้าลองcommentบรรทัดนี้จะเห็นผลว่ามัน error ตรงไหน]

  const user = await getUserById(userId); //await ใช้กับ async func

  return (
    <>
      <Header 
        title={transformation.title} 
        subtitle={transformation.subTitle} 
      />

      <section className='mt-10'>

        <TransformationForm
          action='Add'
          userId={user._id} //เป็นการเอา id ของ user จริงๆมาจาก database
          type={transformation.type as TransformationTypeKey}
          creditBalance={user.creditBalance}
        />
      </section>
    </>
    
  )
}

export default AddTransformationTypePage