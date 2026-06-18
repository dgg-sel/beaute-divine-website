import { v2 as cloudinary } from "cloudinary";
import { env } from "@/lib/env";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";

cloudinary.config({
  cloud_name: env.cloudinaryCloudName,
  api_key: env.cloudinaryApiKey,
  api_secret: env.cloudinaryApiSecret,
});

export async function POST(request: Request) {
  // Ensure the user is an admin before generating a signature
  const session = await getServerSession(authOptions);
  const adminEmails = process.env.ADMIN_EMAILS?.split(',').map(e => e.trim().toLowerCase()) || [];
  
  if (!session?.user?.email || !adminEmails.includes(session.user.email.toLowerCase())) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { paramsToSign } = body;

    // Generate a signature for the upload
    const signature = cloudinary.utils.api_sign_request(
      paramsToSign,
      env.cloudinaryApiSecret
    );

    return Response.json({ signature });
  } catch (error) {
    console.error("Error generating signature", error);
    return Response.json({ error: "Failed to generate signature" }, { status: 500 });
  }
}
