import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface MainState {
  username: string;
  contacts: {
    contactName: string;
    ContactMessages: ({ message: string; room: string; Received: boolean; time: string; })[]
  }[];
  currentContact: string
  LoginStatus: boolean
  userSession: boolean
  Theme: string
}
const initialState: MainState = {
  username: 'default',
  contacts: [{
    contactName: 'abc',
    ContactMessages: [{
      message: 'RightMessage',
      room: 'Tayyab Riaz',
      Received: false,
      time: '5:52 PM',
    }, {
      message: 'RightMessage',
      room: 'Tayyab Riaz',
      Received: true,
      time: '5:52 PM',
    }]
  }, {
    contactName: 'abc2',
    ContactMessages: [{
      message: 'RightMessage2',
      room: 'Tayyab Riaz',
      Received: false,
      time: '5:52 PM',
    }, {
      message: 'RightMessage2',
      room: 'Tayyab Riaz',
      Received: true,
      time: '5:52 PM',
    }]
  }],
  currentContact: 'abc',
  LoginStatus: false,
  userSession: false,
  Theme: 'light',

}

const mainSlice = createSlice(
  {
    name: "main",
    initialState,
    reducers: {
      // set currently selected contact to set messages
      setCurrentContact: (state, action: PayloadAction<string>) => {
        state.currentContact = action.payload;
      },

      // take contacts list and set contacts list
      SetNewContacts: (state, action: PayloadAction<{
        contactName: string;
        ContactMessages: { message: string; room: string; Received: boolean; time: string; }[]
      }[]>) => {
        state.contacts = action.payload;
      },

      // take a contact and save it at start of contact list
      SaveNewContact: (state, action: PayloadAction<{
        contactName: string;
        ContactMessages: [{
          message: string;
          room: string;
          Received: boolean;
          time: string;
        }]
      }>) => {
        if (!state.contacts.find((contact) => contact.contactName === action.payload.contactName))
          state.contacts.unshift(action.payload);
      },

      // update username to state
      setUserName: (state, action: PayloadAction<string>) => {
        state.username = action.payload;
      },

      SaveMessage: (state, action: PayloadAction<{
        from: string;
        to: string;
        message: string;
        time: string;
        Received: boolean;
      }>) => {
        const data = action.payload

        state.contacts.map((contact) => {
          if (contact.contactName === data.from) {
            contact.ContactMessages.push({
              message: data.message,
              room: data.to,
              Received: data.Received,
              time: data.time
            })
          }
        })
      },

      login: (state, action: PayloadAction<boolean>) => {
        state.LoginStatus = true;
        state.userSession = action.payload;
      },
      logout: (state) => {
        state.LoginStatus = false;
        state.userSession = false;
      },
      changeTheme: (state) => {
        console.log(state.Theme);
        //==================== change mood ( START ) ===========================
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        document.documentElement.setAttribute('data-theme', newTheme);
        newTheme === 'dark' ? document.documentElement.classList.add('dark') :
          document.documentElement.classList.remove('dark');
        //==================== change mood  ( END )  ===========================
        // newTheme = actions.payload
        state.Theme = newTheme;
        localStorage.setItem('theme', newTheme);
      }
    }
  }
)

export const { setCurrentContact, SetNewContacts, SaveNewContact, setUserName, SaveMessage, changeTheme, login, logout } = mainSlice.actions;

export default mainSlice.reducer;