import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/options";
import dbConnect from "@/src/lib/dbConnect";
import UserModel from "@/src/model/User";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs"; // Make sure to import bcrypt

export async function DELETE(request: Request) {
  await dbConnect();
  
  try {
    const session = await getServerSession(authOptions);

    // 1. Session check
    if (!session || !session.user) {
      return NextResponse.json(
        { success: false, message: "Unauthorized access" },
        { status: 401 }
      );
    }

    // 2. Parse the password from the request body
    const { password } = await request.json();

    if (!password) {
        return NextResponse.json(
            { success: false, message: "Password is required to delete account" },
            { status: 400 }
        );
    }

    // 3. Locate the user (include the password field specifically)
    const user = await UserModel.findOne({ email: session.user.email });

    if (!user) {
      return NextResponse.json(
        { success: false, message: "User not found" },
        { status: 404 }
      );
    }

    // 4. THE SECURITY GATE: Compare passwords
    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (!isPasswordCorrect) {
        return NextResponse.json(
            { success: false, message: "Incorrect password" },
            { status: 403 }
        );
    }

    // 5. The Final Purge
    const deletedUser = await UserModel.deleteOne({ _id: user._id });

    if (deletedUser.deletedCount === 0) {
        return NextResponse.json(
            { success: false, message: "Failed to delete account" },
            { status: 500 }
        );
    }

    return NextResponse.json(
      { success: true, message: "Account and data purged successfully" },
      { status: 200 }
    );

  } catch (error) {
    console.error("Purge Error:", error);
    return NextResponse.json(
      { success: false, message: "An error occurred during account termination" },
      { status: 500 }
    );
  }
}