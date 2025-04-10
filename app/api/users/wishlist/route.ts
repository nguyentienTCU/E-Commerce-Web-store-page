import User from "@/lib/models/User";
import { connectToDB } from "@/lib/mongoDB";
import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  try {
    const { userId } = await auth();
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    await connectToDB();
    const user = await User.findOne({ clerkId: userId });
    if (!user) {
      return new NextResponse("User not found", { status: 404 });
    }
    const { productId } = await req.json();
    const isLiked = user.wishlist.includes(productId);
    if (isLiked) {
      user.wishlist = user.wishlist.filter((id: string) => id !== productId);
    } else {
      user.wishlist.push(productId);
    }

    await user.save();
    return NextResponse.json(user, { status: 200 });
  } catch (error) {
    console.log("[users_GET]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
};
