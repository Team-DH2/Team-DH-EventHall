// import { prisma } from "@/lib/prisma";
// import { uploadImageToCloudinary } from "@/lib/uploadimage";
// import { NextRequest, NextResponse } from "next/server";

// export async function POST(req: NextRequest) {
//   try {
//     const body = await req.json();
//     const { name, hallName, location, number, email, images } = body;

//     const Form = await prisma.Form.create({
//       data: {
//         name: name,
//         hallname: hallName,
//         location: location,
//         number: number,
//         email: email,
//         images: images,
//       },
//     });
//     // console.log("=== articleId: article.id ===", article.id);
//     // return NextResponse.json({ message: response.text, articleId: article.id });

//     // Cloudinary
//     const uploadedImages: string[] = [];
//     for (const img of images) {
//       const url = await uploadImageToCloudinary(img);
//       uploadedImages.push(url);
//     }

//     return NextResponse.json({
//       message: "Amjilttai",
//       uploadedImages,
//     });
//   } catch (error) {
//     console.log(error);
//     return NextResponse.json({ error: "Aldaa garlaa" }, { status: 500 });
//   }
// }

import { prisma } from "@/lib/prisma";
import { uploadImageToCloudinary } from "@/lib/uploadimage";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, hallName, location, number, email, images } = body;

    // Cloudinary-д upload хийх
    const uploadedImages: string[] = [];
    for (const img of images) {
      const url = await uploadImageToCloudinary(img);
      uploadedImages.push(url);
    }

    //  Prisma-д хадгалах
    const form = await prisma.form.create({
      data: {
        name: name,
        hallname: hallName,
        location: location,
        number: number,
        email: email,
        images: uploadedImages,
      },
    });

    return NextResponse.json({
      message: "Амжилттай хадгалагдлаа",
      form,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: "Алдаа гарлаа" }, { status: 500 });
  }
}
