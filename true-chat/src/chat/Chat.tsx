import ContactsList from "./ContactsList";
import Header from "./Header";
import MessagesBox from "./MessagesBox";

export default function Chat() {
  return (
    <div className="w-full grid grid-cols-8 bg-zinc-100 dark:bg-zinc-900">
      {/* <Header /> */}
      <ContactsList />
      <MessagesBox />
    </div>
  );
}
