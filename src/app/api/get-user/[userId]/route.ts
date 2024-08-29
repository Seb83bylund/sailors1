import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../../auth/[...nextauth]/route";

export async function GET (request: NextRequest, { params }: { params: { userId: string } }) {

    const userId = params.userId; 

    const session = await getServerSession(authOptions);

    if (!session) {
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const user = await prisma.user.findUnique({
        where: { id: userId }
    });

    if (!user) {
        return NextResponse.json({ message: "User could not be found" }, { status: 402 });
    }

    return NextResponse.json(user, { status: 200 });

}