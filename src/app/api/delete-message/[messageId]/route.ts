import UserModel from "@/model/User";
import { getServerSession } from "next-auth/next";
import dbConnect from "@/lib/dbConnect";
import { User } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../../auth/[...nextauth]/options";

export async function DELETE(
  request: NextRequest,
  { params }: { params: { messageid: string } }
) {
  const { messageid } = params;
  await dbConnect();

  const session = await getServerSession(authOptions);
  const user = session?.user as User;

  if (!session || !user) {
    return new NextResponse(
      JSON.stringify({ success: false, message: "Not authenticated" }),
      { status: 401 }
    );
  }

  try {
    // Ensure messageid is a string
    const messageIdString = messageid.toString();

    const updateResult = await UserModel.updateOne(
      { _id: user._id },
      { $pull: { messages: { _id: messageIdString } } }
    );

    console.log(updateResult);

    if (updateResult.modifiedCount === 0) {
      return new NextResponse(
        JSON.stringify({
          success: false,
          message: "Message not found or already deleted",
        }),
        { status: 404 }
      );
    }

    return new NextResponse(
      JSON.stringify({ success: true, message: "Message deleted" }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting message:", error);
    return new NextResponse(
      JSON.stringify({ success: false, message: "Error deleting message" }),
      { status: 500 }
    );
  }
}
