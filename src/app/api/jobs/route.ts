import { prisma } from "@/prisma/prisma";
import { NextRequest, NextResponse } from "next/server";



export async function POST(request: NextRequest) { 

    const userCreated = await prisma.user.create({
        data :{
            name: "John Doe",
            email: "",
            password:""
        }
    })


    return NextResponse.json(userCreated)
}

export async function GET(request: NextRequest) { 
    const users = await prisma.user.findMany()
    return NextResponse.json(users)
}