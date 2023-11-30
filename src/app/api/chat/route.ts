import getCurrentUser from "@/app/\baction/getCurrentUser";
import { NextResponse } from "next/server";
import client from "@/helpers/client";

export async function GET(request: Request) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.error();
  }

  if (request.method === "GET") {
    const users = await client.user.findMany({
      include: {
        conversations: {
          include: {
            messages: {
              include: {
                sender: true,
                receiver: true,
              },
              orderBy: {
                createAt: "asc",
              },
            },
            users: true,
          },
        },
      },
    });

    return NextResponse.json(users);
  }
}

export async function POST(request: Request) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.error();
  }

  const { text, image, senderId, receiverId, conversationId } =
    await request.json();

  if (request.method === "POST") {
    const conversation = await client.conversation.findFirst({
      where: {
        AND: [
          {
            users: {
              some: {
                id: senderId,
              },
            },
          },
          {
            users: {
              some: {
                id: receiverId,
              },
            },
          },
        ],
      },
    });

    if (conversation) {
      try {
        const message = await client.message.create({
          data: {
            text,
            image,
            senderId,
            receiverId,
            conversationId: conversation.id,
          },
        });

        return NextResponse.json(message);
      } catch (error) {
        return NextResponse.error();
      }
    } else {
      const newConversation = await client.conversation.create({
        data: {
          senderId,
          receiverId,
          users: {
            connect: [
              {
                id: senderId,
              },
              {
                id: receiverId,
              },
            ],
          },
        },
      });
      try {
        const message = await client.message.create({
          data: {
            text,
            image,
            senderId,
            receiverId,
            conversationId: newConversation.id,
          },
        });

        return NextResponse.json(message);
      } catch (error) {
        return NextResponse.error();
      }
    }
  }
}
