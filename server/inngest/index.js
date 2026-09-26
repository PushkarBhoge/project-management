import { Inngest } from "inngest";
import { prisma } from "../configs/prisma.js";

// Create a client to send and receive events
export const inngest = new Inngest({
  id: "project-management",
  env: process.env.INNGEST_ENV || (process.env.NODE_ENV === "production" ? "production" : undefined),
});

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

// inngest function to save workspace data to a database
const syncWorkspaceCreation = inngest.createFunction(
  {
    id: "sync-workspace-from-clerk",
    triggers: [
      { event: "clerk/organization.created" },
      { event: "organization.created" },
    ],
  },
  async ({ event }) => {
    const data = event.data?.data || event.data;
    await prisma.workspace.create({
      data: {
        id: data.id,
        name: data.name,
        slug: data.slug,
        ownerId: data.created_by,
        image_url: data.image_url || "",
      },
    });

    // add creator as admin member
    await prisma.workspaceMember.create({
      data: {
        userId: data.created_by,
        workspaceId: data.id,
        role: "ADMIN",
      },
    });
  }
);

// inngest function to update workspace data in database
const syncWorkspaceUpdation = inngest.createFunction(
  {
    id: "update-workspace-from-clerk",
    triggers: [
      { event: "clerk/organization.updated" },
      { event: "organization.updated" },
    ],
  },
  async ({ event }) => {
    const data = event.data?.data || event.data;
    await prisma.workspace.update({
      where: {
        id: data.id,
      },
      data: {
        name: data.name,
        slug: data.slug,
        image_url: data.image_url || "",
      },
    });
  }
);

// inngest function to delete workspace data from database
const syncWorkspaceDeletion = inngest.createFunction(
  {
    id: "delete-workspace-with-clerk",
    triggers: [
      { event: "clerk/organization.deleted" },
      { event: "organization.deleted" },
    ],
  },
  async ({ event }) => {
    const data = event.data?.data || event.data;
    await prisma.workspace.delete({
      where: {
        id: data.id,
      },
    });
  }
);

// inngest function to save workspace member data to a database
const syncWorkspaceMemberCreation = inngest.createFunction(
  {
    id: "sync-workspace-member-from-clerk",
    triggers: [
      { event: "clerk/organizationInvitation.accepted" },
      { event: "organizationInvitation.accepted" },
      { event: "clerk/organizationMembership.created" },
      { event: "organizationMembership.created" },
    ],
  },
  async ({ event }) => {
    const data = event.data?.data || event.data;
    const role = String(data.role_name || data.role || "").toUpperCase().includes("ADMIN") ? "ADMIN" : "MEMBER";
    const userId = data.user_id || data.public_user_data?.user_id;
    const workspaceId = data.organization_id || data.organization?.id;

    await prisma.workspaceMember.create({
      data: {
        userId: userId,
        workspaceId: workspaceId,
        role: role,
      },
    });
  }
);

// Create an empty array where we'll export future Inngest functions
export const functions = [
    syncUserCreation,
    syncUserDeletion,
    syncUserUpdation,
    syncWorkspaceCreation,
    syncWorkspaceUpdation,
    syncWorkspaceDeletion,
    syncWorkspaceMemberCreation,
]; 