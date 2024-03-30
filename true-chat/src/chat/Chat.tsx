import ContactsList from "./Contacts/ContactsList";
import MsgContainer from "./Messages/MsgContainer";

export default function Chat() {
  return (
    <div className="w-full grid grid-cols-8 bg-zinc-100 dark:bg-zinc-900">
      {/* <Header /> */}
      <ContactsList />
      <MsgContainer />

    </div>
  );
}
