import { ApiResponse } from "@/types/ApiResponse";
import { resend } from "@/lib/resend";
import VerificationEmail from "../../emails/VerificationEmail";

export async function sendVerificationEmail(
  email: string,
  username: string,
  verifyCode: string
): Promise<ApiResponse> {
  try {
    await resend.emails.send({
      from: "onboarding@resend.dev",
      to: email,
      subject: "Hello World",
      react: VerificationEmail({ username, otp: verifyCode }),
    });

    return {
      success: true,
      message: "Email Sent Successfully",
    };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      message: "Failed to send verification email",
    };
  }
}