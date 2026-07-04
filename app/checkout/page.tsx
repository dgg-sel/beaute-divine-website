
import CheckoutClient from "./CheckoutClient";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export default async function CheckoutPage() {
  const session = await getServerSession(authOptions);
  
  let userAddresses: any[] = [];
  
  if (session?.user?.email) {
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      include: { addresses: true },
    });
    if (user?.addresses) {
      userAddresses = user.addresses;
    }
  }

  const shippingCost = parseFloat(process.env.SHIPPING_COST || "0");

  return (
    <main className="pt-32 pb-[64px] bg-surface min-h-screen">
      <div className="max-w-[1200px] mx-auto px-4 md:px-16">
        <CheckoutClient userAddresses={userAddresses} userId={(session?.user as any)?.id} shippingCost={shippingCost} />
      </div>
    </main>
  );
}
