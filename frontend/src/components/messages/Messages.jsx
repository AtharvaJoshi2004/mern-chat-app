import { useEffect, useRef } from "react";
import useGetMessages from "../../hooks/useGetMessages";
import MessageSkeleton from "../skeletons/MessageSkeleton";
import Message from "./Message";
import useListenMessages from "../../hooks/useListenMessages";
import useConversation from "../../zustand/useConversation"; // ✅ Import Zustand store

const Messages = () => {
	const { messages, loading } = useGetMessages();
	useListenMessages();
	const lastMessageRef = useRef();
	const { selectedConversation } = useConversation(); // ✅ Get selected conversation

	// ✅ Filter messages to show only the selected conversation's messages
	const filteredMessages = messages.filter(
		(msg) =>
			msg.senderId === selectedConversation?._id || msg.receiverId === selectedConversation?._id
	);

	useEffect(() => {
		setTimeout(() => {
			lastMessageRef.current?.scrollIntoView({ behavior: "smooth" });
		}, 100);
	}, [filteredMessages]); // ✅ Scroll when filtered messages update

	return (
		<div className='px-4 flex-1 overflow-auto'>
			{!loading &&
				filteredMessages.length > 0 &&
				filteredMessages.map((message) => (
					<div key={message._id} ref={lastMessageRef}>
						<Message message={message} />
					</div>
				))}

			{loading && [...Array(3)].map((_, idx) => <MessageSkeleton key={idx} />)}

			{!loading && filteredMessages.length === 0 && (
				<p className='text-center'>Send a message to start the conversation</p>
			)}
		</div>
	);
};

export default Messages;

// STARTER CODE SNIPPET
// import Message from "./Message";

// const Messages = () => {
// 	return (
// 		<div className='px-4 flex-1 overflow-auto'>
// 			<Message />
// 			<Message />
// 			<Message />
// 			<Message />
// 			<Message />
// 			<Message />
// 			<Message />
// 			<Message />
// 			<Message />
// 			<Message />
// 			<Message />
// 			<Message />
// 		</div>
// 	);
// };
// export default Messages;
