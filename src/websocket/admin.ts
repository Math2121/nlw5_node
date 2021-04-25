import { io } from "../http";
import { ConnectionsService } from "../services/ConnectionsService";
import { MessageService } from "../services/MessageService";

io.on("connect", async (socket) => {
  const connnectonServcies = new ConnectionsService();
  const messagesService = new MessageService();
  const allConnectionWithoutAdmin = await connnectonServcies.findAllWithoutAdmin();

  io.emit("admin_list_allUsers", allConnectionWithoutAdmin);

  socket.on("admin_list_messages_by_user", async (params, callback) => {
    const { user_id } = params;

    const allMessages = await messagesService.listByUser(user_id);

    callback(allMessages);
  });

  socket.on("admin_send_message", async (params) => {
    const { user_id, text } = params;

    await messagesService.create({
      text,
      user_id,
      admin_id: socket.id,
    });

    const { socket_id } = await connnectonServcies.findByUserId(user_id);

    io.to(socket_id).emit("admin_send_to_client", {
      text,
      socket_id: socket.id,
    });
  });

  socket.on("admin_user_in_support",async params => {
    const {user_id} = params;

  await connnectonServcies.updateAdminId(user_id,socket.id)
  const allConnectionWithoutAdmin = await connnectonServcies.findAllWithoutAdmin();

  io.emit("admin_list_allUsers", allConnectionWithoutAdmin);
  })
});
