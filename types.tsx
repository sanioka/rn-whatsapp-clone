export type RootStackParamList = {
  Root: undefined;
  NotFound: undefined;
  ChatRoom: undefined;
  Contacts: undefined;
};

export type MainTabParamList = {
  Camera: undefined;
  Chats: undefined;
  Status: undefined;
  Calls: undefined;
};

export type TabOneParamList = {
  TabOneScreen: undefined;
};

export type TabTwoParamList = {
  TabTwoScreen: undefined;
};

export type User = {
  id: String;
  name: String;
  imageUrl: String;
  status: String;
}

export type Message = {
  id: String;
  content: String;
  createdAt: string;
  user: User;
}
export type ChatRoom = {
  id: String;
  users: User[];
  lastMessage: Message;
}