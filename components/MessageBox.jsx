const MessageBox = ({ message, currentUser }) => {
	return message?.sender?._id !== currentUser._id  ? (<div>MessageBox</div>);
};

export default MessageBox;
