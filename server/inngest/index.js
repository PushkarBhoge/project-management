import { Inngest } from "inngest";
import { prisma } from "../configs/prisma.js";
import sendEmail from "../configs/nodemailer.js";

// Create a client to send and receive events
export const inngest = new Inngest({
  id: "project-management",
  env:
    process.env.INNGEST_ENV ||
    (process.env.NODE_ENV === "production" ? "production" : undefined),
});

// inngest function to save user data to database
const syncUserCreation = inngest.createFunction(
  {
    id: "sync-user-from-clerk",
    triggers: [{ event: "clerk/user.created" }, { event: "user.created" }],
  },
  async ({ event }) => {
    const user = event.data?.data || event.data;
    const name =
      `${user?.first_name || user?.firstName || ""} ${user?.last_name || user?.lastName || ""}`.trim();
    await prisma.user.create({
      data: {
        id: user.id,
        email:
          user?.email_addresses?.[0]?.email_address ||
          user?.email_addresses?.[0]?.email_addres,
        name: name || "User",
        image: user?.image_url,
      },
    });
  },
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
  },
);

// inngest function to update user data in database
const syncUserUpdation = inngest.createFunction(
  {
    id: "update-user-from-clerk",
    triggers: [{ event: "clerk/user.updated" }, { event: "user.updated" }],
  },
  async ({ event }) => {
    const user = event.data?.data || event.data;
    const name =
      `${user?.first_name || user?.firstName || ""} ${user?.last_name || user?.lastName || ""}`.trim();
    await prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        email: user?.email_addresses[0]?.email_address,
        name: name || "User",
        image: user?.image_url,
      },
    });
  },
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
  },
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
  },
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
  },
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
    const role = String(data.role_name || data.role || "")
      .toUpperCase()
      .includes("ADMIN")
      ? "ADMIN"
      : "MEMBER";
    const userId = data.user_id || data.public_user_data?.user_id;
    const workspaceId = data.organization_id || data.organization?.id;

    await prisma.workspaceMember.create({
      data: {
        userId: userId,
        workspaceId: workspaceId,
        role: role,
      },
    });
  },
);

// inngest function to send email on task creation
const sendTaskAssigmentEmail = inngest.createFunction(
  {
    id: "send-task-assignment-mail",
    triggers: [{ event: "task/assigned" }, { event: "app/task.assigned" }],
  },
  async ({ event, step }) => {
    const { taskId, origin, orign } = event.data;

    const task = await prisma.task.findUnique({
      where: { id: taskId },
      include: { assignee: true, project: true },
    });

    if (!task || !task.assignee?.email) return;

    // Format due date safely
    const dueDateFormatted = task.due_date
      ? new Date(task.due_date).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      })
      : "No due date";

    // Priority color styling
    const priorityColor =
      task.priority === "HIGH"
        ? "#ef4444"
        : task.priority === "MEDIUM"
          ? "#f59e0b"
          : "#10b981";

    // Task link
    const taskUrl = origin || orign
      ? `${origin || orign}/projects/${task.projectId}/tasks/${task.id}`
      : "#";

    await sendEmail({
      to: task.assignee.email,
      subject: `New Task Assignment in ${task.project.name}: "${task.title}"`,
      body: `
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>New Task Assignment</title>
        </head>
        <body style="margin: 0; padding: 0; background-color: #f4f5f7; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #1f2937;">
          <table width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color: #f4f5f7; padding: 32px 16px;">
            <tr>
              <td align="center">
                <table width="100%" border="0" cellspacing="0" cellpadding="0" style="max-width: 580px; background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05); border: 1px solid #e5e7eb;">
                  
                  <!-- Top Accent Bar -->
                  <tr>
                    <td style="background: linear-gradient(90deg, #4f46e5 0%, #7c3aed 100%); height: 6px;"></td>
                  </tr>

                  <!-- Header Area -->
                  <tr>
                    <td style="padding: 32px 32px 16px 32px;">
                      <span style="display: inline-block; font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; background-color: #eef2ff; color: #4f46e5; padding: 4px 10px; border-radius: 9999px;">
                        ${task.project.name}
                      </span>
                      <h1 style="margin: 16px 0 0 0; font-size: 22px; font-weight: 700; color: #111827; line-height: 1.3;">
                        New Task Assigned to You
                      </h1>
                      <p style="margin: 8px 0 0 0; font-size: 15px; color: #4b5563; line-height: 1.5;">
                        Hello <strong>${task.assignee.name || "there"}</strong>, you have been assigned to work on the following task:
                      </p>
                    </td>
                  </tr>

                  <!-- Task Summary Box -->
                  <tr>
                    <td style="padding: 8px 32px 24px 32px;">
                      <div style="background-color: #f9fafb; border-radius: 8px; border: 1px solid #e5e7eb; padding: 20px;">
                        <h2 style="margin: 0 0 10px 0; font-size: 17px; font-weight: 600; color: #111827;">
                          ${task.title}
                        </h2>
                        <p style="margin: 0 0 18px 0; font-size: 14px; color: #6b7280; line-height: 1.6;">
                          ${task.description || "<em>No description provided for this task.</em>"}
                        </p>

                        <!-- Task Details Grid -->
                        <table width="100%" border="0" cellspacing="0" cellpadding="0" style="border-top: 1px solid #e5e7eb; padding-top: 14px; font-size: 13px;">
                          <tr>
                            <td width="50%" style="padding: 6px 0; color: #6b7280;">
                              <strong>Priority:</strong> 
                              <span style="display: inline-block; color: ${priorityColor}; font-weight: 600; text-transform: uppercase;">
                                ${task.priority}
                              </span>
                            </td>
                            <td width="50%" style="padding: 6px 0; color: #6b7280;">
                              <strong>Type:</strong> 
                              <span style="color: #111827; font-weight: 500;">
                                ${task.type || "TASK"}
                              </span>
                            </td>
                          </tr>
                          <tr>
                            <td width="50%" style="padding: 6px 0; color: #6b7280;">
                              <strong>Status:</strong> 
                              <span style="color: #111827; font-weight: 500;">
                                ${task.status || "TODO"}
                              </span>
                            </td>
                            <td width="50%" style="padding: 6px 0; color: #6b7280;">
                              <strong>Due Date:</strong> 
                              <span style="color: #111827; font-weight: 500;">
                                ${dueDateFormatted}
                              </span>
                            </td>
                          </tr>
                        </table>
                      </div>
                    </td>
                  </tr>

                  <!-- Action Button -->
                  <tr>
                    <td align="center" style="padding: 0 32px 32px 32px;">
                      <a href="${taskUrl}" target="_blank" style="display: inline-block; background-color: #4f46e5; color: #ffffff; text-decoration: none; padding: 12px 28px; border-radius: 8px; font-size: 15px; font-weight: 600; letter-spacing: 0.01em; box-shadow: 0 2px 4px rgba(79, 70, 229, 0.25);">
                        View Task in Dashboard &rarr;
                      </a>
                    </td>
                  </tr>

                  <!-- Footer -->
                  <tr>
                    <td style="background-color: #f9fafb; padding: 20px 32px; border-top: 1px solid #e5e7eb; font-size: 12px; color: #9ca3af; text-align: center; line-height: 1.5;">
                      You received this notification because you were assigned to a task in <strong>${task.project.name}</strong>.
                      <br>&copy; ${new Date().getFullYear()} Project Management. All rights reserved.
                    </td>
                  </tr>

                </table>
              </td>
            </tr>
          </table>
        </body>
        </html>
      `,
    });

    if (
      new Date(task.due_date).toLocaleDateString() !== new Date().toDateString()
    ) {
      await step.sleepUntil("wait-for-the-due-date", new Date(task.due_date));

      await step.run("check-if-task-is-completed", async () => {
        const task = await prisma.task.findUnique({
          where: { id: taskId },
          include: { assignee: true, project: true },
        });

        if (!task) return;
        if (task.status !== "DONE") {
          await step.run("send-task-reminder-mail", async () => {
            await sendEmail({
              to: task.assignee.email,
              subject: `Reminder for ${task.project.name}`,
              body: `<!DOCTYPE html>
                      <html lang="en">
                      <head>
                        <meta charset="UTF-8">
                        <meta name="viewport" content="width=device-width, initial-scale=1.0">
                        <title>Task Due Date Reminder</title>
                      </head>
                      <body style="margin: 0; padding: 0; background-color: #f4f5f7; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #1f2937;">
                        <table width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color: #f4f5f7; padding: 32px 16px;">
                          <tr>
                            <td align="center">
                              <table width="100%" border="0" cellspacing="0" cellpadding="0" style="max-width: 580px; background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05); border: 1px solid #e5e7eb;">
                                
                                <!-- Top Accent Bar (Amber / Warning) -->
                                <tr>
                                  <td style="background: linear-gradient(90deg, #f59e0b 0%, #ef4444 100%); height: 6px;"></td>
                                </tr>

                                <!-- Header Area -->
                                <tr>
                                  <td style="padding: 32px 32px 16px 32px;">
                                    <span style="display: inline-block; font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; background-color: #fef3c7; color: #b45309; padding: 4px 10px; border-radius: 9999px;">
                                      ⏰ Due Date Reminder &bull; ${task.project.name}
                                    </span>
                                    <h1 style="margin: 16px 0 0 0; font-size: 22px; font-weight: 700; color: #111827; line-height: 1.3;">
                                      Task Pending & Due Soon
                                    </h1>
                                    <p style="margin: 8px 0 0 0; font-size: 15px; color: #4b5563; line-height: 1.5;">
                                      Hello <strong>${task.assignee.name || "there"}</strong>, this is a friendly reminder that the following task is scheduled for completion and has not yet been marked as completed:
                                    </p>
                                  </td>
                                </tr>

                                <!-- Task Summary Box -->
                                <tr>
                                  <td style="padding: 8px 32px 24px 32px;">
                                    <div style="background-color: #fffbeb; border-radius: 8px; border: 1px solid #fde68a; padding: 20px;">
                                      <h2 style="margin: 0 0 10px 0; font-size: 17px; font-weight: 600; color: #92400e;">
                                        ${task.title}
                                      </h2>
                                      <p style="margin: 0 0 18px 0; font-size: 14px; color: #78350f; line-height: 1.6;">
                                        ${task.description || "<em>No description provided for this task.</em>"}
                                      </p>

                                      <!-- Task Details Grid -->
                                      <table width="100%" border="0" cellspacing="0" cellpadding="0" style="border-top: 1px solid #fde68a; padding-top: 14px; font-size: 13px;">
                                        <tr>
                                          <td width="50%" style="padding: 6px 0; color: #78350f;">
                                            <strong>Current Status:</strong> 
                                            <span style="display: inline-block; background-color: #fee2e2; color: #991b1b; padding: 2px 8px; border-radius: 4px; font-weight: 600; text-transform: uppercase; font-size: 11px;">
                                              ${task.status || "IN PROGRESS"}
                                            </span>
                                          </td>
                                          <td width="50%" style="padding: 6px 0; color: #78350f;">
                                            <strong>Priority:</strong> 
                                            <span style="color: #92400e; font-weight: 600; text-transform: uppercase;">
                                              ${task.priority}
                                            </span>
                                          </td>
                                        </tr>
                                        <tr>
                                          <td width="50%" style="padding: 6px 0; color: #78350f;">
                                            <strong>Project:</strong> 
                                            <span style="color: #111827; font-weight: 500;">
                                              ${task.project.name}
                                            </span>
                                          </td>
                                          <td width="50%" style="padding: 6px 0; color: #78350f;">
                                            <strong>Due Date:</strong> 
                                            <span style="color: #b45309; font-weight: 700;">
                                              ${new Date(task.due_date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                                            </span>
                                          </td>
                                        </tr>
                                      </table>
                                    </div>
                                  </td>
                                </tr>

                                <!-- Action Button -->
                                <tr>
                                  <td align="center" style="padding: 0 32px 32px 32px;">
                                    <a href="${origin ? `${origin}/projects/${task.projectId}/tasks/${task.id}` : "#"}" target="_blank" style="display: inline-block; background-color: #f59e0b; color: #ffffff; text-decoration: none; padding: 12px 28px; border-radius: 8px; font-size: 15px; font-weight: 600; letter-spacing: 0.01em; box-shadow: 0 2px 4px rgba(245, 158, 11, 0.3);">
                                      View & Complete Task &rarr;
                                    </a>
                                  </td>
                                </tr>

                                <!-- Footer -->
                                <tr>
                                  <td style="background-color: #f9fafb; padding: 20px 32px; border-top: 1px solid #e5e7eb; font-size: 12px; color: #9ca3af; text-align: center; line-height: 1.5;">
                                    This is an automated reminder regarding your pending task in <strong>${task.project.name}</strong>.
                                    <br>&copy; ${new Date().getFullYear()} Project Management. All rights reserved.
                                  </td>
                                </tr>

                              </table>
                            </td>
                          </tr>
                        </table>
                      </body>
                      </html>
                    `,
            });
          });
        }
      });
    }
  },
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
  sendTaskAssigmentEmail
  
];
