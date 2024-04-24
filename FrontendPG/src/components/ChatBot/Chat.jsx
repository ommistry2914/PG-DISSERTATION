// import { PrettyChatWindow } from "react-chat-engine-pretty";
import { ChatEngine } from 'react-chat-engine';


const ChatsPage = () => {
  return (
    <div style={{ height: "100vh", width: "100vw" }}>
      {/* <PrettyChatWindow
        projectId="0c4a5476-6ddb-4835-bcb3-6b8aad36ade9"
        username={props.user.username} // adam
        secret={props.user.secret} // pass1234
        style={{ height: "100%" }}
      /> */}
      <ChatEngine
      projectID='0c4a5476-6ddb-4835-bcb3-6b8aad36ade9'
			userName="what"
			userSecret="1234567890"
		/>
    </div>
  );
};

export default ChatsPage;