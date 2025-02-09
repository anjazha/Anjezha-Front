import { useEffect, useRef, useState } from "react";
import { getMessages } from "../functions/getMessages";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import Spinner from "./Spinner";
import { Socket } from "socket.io-client";

export interface Message {
  changeStatusAt: string;
  conversationId: string;
  id: string;  // Unique message ID
  message: string;
  messageStatus: string;
  senderId: string;
  sentAt: string;
}

const Messages = ({
  socket,
  converId,
}: {
  socket: Socket | null;
  converId: string;
}) => {
  const user = useSelector((state: RootState) => state.user);
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingMessageId, setEditingMessageId] = useState<string | null>(null);
  const [editedMessage, setEditedMessage] = useState<string>("");

  const currentMessages: React.LegacyRef<HTMLDivElement> | null | undefined =
    useRef(null);

  // Fetch messages on conversation ID change
  useEffect(() => {
    if (converId) {
      getMessages(converId, setMessages, setLoading);
    }
  }, [converId]);

  // Listen for new messages and updated/deleted messages
  useEffect(() => {
    if (socket) {
      socket.on("receive-message", (data) => {
        const newMessage = JSON.parse(data);
        console.log(newMessage)
        setMessages((prev) => [...prev, newMessage]);
      });

      socket.on("message-updated", (data) => {
        const updatedMessages = messages.map((msg) =>
          msg.id === data.messageId
            ? { ...msg, message: data.message }
            : msg
        );
        setMessages(updatedMessages);
      });

      // Listen for the message-deleted event and remove the message by id
      socket.on("message-deleted", (data) => {
        const filteredMessages = messages.filter(
          (msg) => msg.id !== data.messageId
        );
        setMessages(filteredMessages);
      });
    }

    return () => {
      socket?.off("receive-message");
      socket?.off("message-updated");
      socket?.off("message-deleted");
    };
  }, [messages, socket]);

  // Scroll to the bottom when messages update
  useEffect(() => {
    if (currentMessages.current) {
      currentMessages.current.scrollIntoView({
        behavior: "smooth",
        block: "end",
      });
    }
  }, [messages]);

  // Handle the update message process
  const handleUpdateMessage = (messageId: string) => {
    if (editedMessage.trim()) {
      socket?.emit("update-message", { message: editedMessage, messageId });
      setEditingMessageId(null); // Exit editing mode
    }
  };

  // Handle delete message
  const handleDeleteMessage = (messageId: string) => {
    socket?.emit("delete-message", { messageId });
  };

  // Render
  return (
    <div className="my-3" ref={currentMessages}>
      {loading ? (
        <Spinner />
      ) : (
        messages.map((msg) => (
          <div key={msg.id} className="mt-3"> {/* Use msg.id as the unique key */}
            {+msg.senderId === +user.id ? (
              <div className="flex bg-teal-100 w-fit shadow-md ml-2 p-1 px-2 rounded-md mr-auto items-end flex-col justify-end">
                {/* Check if this message is being edited */}
                {editingMessageId === msg.id ? (
                  <>
                    <input
                      type="text"
                      value={editedMessage}
                      onChange={(e) => setEditedMessage(e.target.value)}
                      className="w-full p-1 border rounded"
                    />
                    <button
                      className="mt-2 text-blue-500"
                      onClick={() => handleUpdateMessage(msg.id)}
                    >
                      Save
                    </button>
                  </>
                ) : (
                  <>
                    <p>{msg.message}</p>
                    <span className="text-sm text-start w-full">
                      {new Date(msg.changeStatusAt).getHours()}:
                      {new Date(msg.changeStatusAt).getMinutes()}
                    </span>
                    {/* Add an edit button for the user's own messages */}
                    <div className="flex mt-2">
                      <button
                        className="text-xs text-blue-500 mr-2"
                        onClick={() => {
                          setEditingMessageId(msg.id);
                          setEditedMessage(msg.message);
                        }}
                      >
                        Edit
                      </button>
                      {/* Add a delete button for the user's own messages */}
                      <button
                        className="text-xs text-red-500"
                        onClick={() => handleDeleteMessage(msg.id)}
                      >
                        Delete
                      </button>
                    </div>
                  </>
                )}
              </div>
            ) : (
              <div className="flex bg-white w-fit shadow-md p-1 px-2 rounded-md mr-2 flex-col">
                <p>{msg.message}</p>
                <span className="text-sm text-end w-full">
                  {new Date(msg.changeStatusAt).getHours()}:
                  {new Date(msg.changeStatusAt).getMinutes()}
                </span>
              </div>
            )}
          </div>
        ))
      )}
    </div>
  );
};

export default Messages;
