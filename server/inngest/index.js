import { Inngest } from "inngest";
import { prisma } from "../configs/prisma.js";

// Create a client to send and receive events
export const inngest = new Inngest({ id: "project-management" });

// inngest function to save user data to database
const syncUserCreation = inngest.createFunction(
  {
    id: "sync-user-from-clerk",
    triggers: [{ event: "clerk/user.created" }, { event: "user.created" }],
  },
  async ({ event }) => {
    const user = event.data?.data || event.data;
    const name = `${user?.first_name || user?.firstName || ""} ${user?.last_name || user?.lastName || ""}`.trim();
    await prisma.user.create({
      data: {
        id: user.id,
        email: user?.email_addresses?.[0]?.email_address || user?.email_addresses?.[0]?.email_addres,
        name: name || "User",
        image: user?.image_url,
      },
    });
  }
);

// inngest function to delete user form database
const syncUserDeletion = inngest.createFunction(
  {
    id: "delete-user-with-clerk",
    triggers: [{ event: "clerk/user.deleted" }, { event: "user.deleted" }],
  },
  async ({ event }) => {
    const user = event.data?.data || event.data;
    await prisma.user.delete({
      where: {
        id: user.id,
      },
    });
  }
);

// inngest function to update user data in database
const syncUserUpdation = inngest.createFunction(
  {
    id: "update-user-from-clerk",
    triggers: [{ event: "clerk/user.updated" }, { event: "user.updated" }],
  },
  async ({ event }) => {
    const user = event.data?.data || event.data;
    const name = `${user?.first_name || user?.firstName || ""} ${user?.last_name || user?.lastName || ""}`.trim();
    await prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        email: user?.email_addresses[0]?.email_address ,
        name: name || "User",
        image: user?.image_url,
      },
    });
  }
);

// Create an empty array where we'll export future Inngest functions
export const functions = [
    syncUserCreation,
    syncUserDeletion,
    syncUserUpdation,
]; 