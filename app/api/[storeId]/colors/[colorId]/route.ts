import { auth } from "@clerk/nextjs";
import prismadb from "@/lib/prismadb";
import { NextResponse } from "next/server";

const GET = async (
  req: Request,
  { params }: { params: { colorId: string } }
) => {
  try {
    if (!params.colorId)
      return new NextResponse("Color ID is required", { status: 400 });

    const color = await prismadb.color.findUnique({
      where: {
        id: params.colorId,
      },
    });

    return NextResponse.json(color);
  } catch (error) {
    console.log("COLOR_GET", error);
    return new NextResponse("Internal error", { status: 500 });
  }
};

const PATCH = async (
  req: Request,
  { params }: { params: { storeId: string; colorId: string } }
) => {
  try {
    const { userId } = auth();
    const { name, value } = await req.json();

    if (!userId) return new NextResponse("Unauthenticated", { status: 401 });
    if (!params.storeId)
      return new NextResponse("Store ID is required", { status: 400 });
    if (!params.colorId)
      return new NextResponse("Color ID is required", { status: 400 });
    if (!name) return new NextResponse("Name is required", { status: 400 });
    if (!value) return new NextResponse("Value is required", { status: 400 });

    const storeByUserId = await prismadb.store.findFirst({
      where: {
        id: params.storeId,
        userId,
      },
    });

    if (!storeByUserId)
      return new NextResponse("Unauthorized", { status: 403 });

    const color = await prismadb.color.updateMany({
      where: {
        id: params.colorId,
      },
      data: {
        name,
        value,
      },
    });

    return NextResponse.json(color);
  } catch (error) {
    console.log("COLOR_PATCH", error);
    return new NextResponse("Internal error", { status: 500 });
  }
};

const DELETE = async (
  req: Request,
  { params }: { params: { storeId: string; colorId: string } }
) => {
  try {
    const { userId } = auth();

    if (!userId) return new NextResponse("Unauthenticated", { status: 401 });
    if (!params.storeId)
      return new NextResponse("Store ID is required", { status: 400 });
    if (!params.colorId)
      return new NextResponse("Color ID is required", { status: 400 });

    const storeByUserId = await prismadb.store.findFirst({
      where: {
        id: params.storeId,
        userId,
      },
    });

    if (!storeByUserId)
      return new NextResponse("Unauthorized", { status: 403 });

    const color = await prismadb.color.delete({
      where: {
        id: params.colorId,
      },
    });

    return NextResponse.json(color);
  } catch (error) {
    console.log("COLOR_DELETE", error);
    return new NextResponse("Internal error", { status: 500 });
  }
};

export { GET, PATCH, DELETE };
