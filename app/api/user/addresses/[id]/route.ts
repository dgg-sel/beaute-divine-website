import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ message: "No autorizado" }, { status: 401 });
    }

    const { id } = params;

    const address = await prisma.userAddress.findUnique({
      where: { id },
    });

    if (!address || address.userId !== (session.user as any).id) {
      return NextResponse.json({ message: "No encontrado o no autorizado" }, { status: 404 });
    }

    await prisma.userAddress.delete({
      where: { id },
    });

    return NextResponse.json({ message: "Dirección eliminada" });
  } catch (error) {
    console.error("Error deleting address:", error);
    return NextResponse.json(
      { message: "Error interno del servidor" },
      { status: 500 }
    );
  }
}
