export interface IAPImodes {
  DEV: string;
  PROD: string;
  QA: string;
}

const googleSignIn = true; // social sign on with existing Gmail account
const appleSignIn = true; // social sign on with existing Apple account
const facebookSignIn = true; // social sign on with existing Facebook account

const apiModes: IAPImodes = {
  DEV: '',
  PROD: '',
  QA: '',
};

/* TUTORIAL */
// If enabled, users will be shown on-boarding tutorial screens to explain how to use the app and the token economy. Additionally, in the menu there will be “Tutorial” item that will allow users to review the tutorial again in future. We aim to keep the UI self-explanatory so keeping this disabled by default.
const tutorialStartUponLogin = false; // show tutorial upon login //done
const tutorialShowInMenu = false; // show tutorial item in the menu //done

/* USERS AND ACCOUNTS */
// EMAIL MANAGEMENT
// If enabled, we allow users to add / remove additional e-mails via E-mail menu item. This allows the system to “merge” user accounts when they use different social sign-in (SSO) mechanisms or 3rd parties for user accounts sign in, verification and premium features.
const usersEmailsManageEnabled = false;

/* LOBBY (CHATS) SCREEN */
// LIST OF CHATS
// Here we display a list of group chats that are going to be shown by default to all users joining the app. Users may later reorder or remove these chats.
/*
"chatKey" - public key or Ethereum wallet address of the chat room
“chatDefaultOrder” - default sorting order of the chat room in the users screen
“premiumOnly” - if true, only show this room to premium users
“stickyOrder” - if true, users can’t change the order of this chat room 
“removable” - if false, users cannot remove or leave this chat room
*/
const defaultChatRooms = [
  {
    chatKey: '',
    chatDefaultOrder: '',
    premiumOnly: true,
    stickyOrder: false,
    removable: false,
  },
];
const defaultChats = [
  {
    jid: '5dc237d5792e95ba96240223e14ee00b13d2548c5cdfcf2e27ca67a0b11f5b9d',
    name: 'Random talks',
    premiumOnly: true,
    stickyOrder: false,
    removable: false,
  },
  {
    jid: 'cc39004bf432f6dc34b47cd64251236c9ae65eadd890daef3ff7dbc94c3caecb',
    name: 'Technical support',
    premiumOnly: true,
    stickyOrder: false,
    removable: false,
  },
  {
    jid: 'dc635d74fb77f53701d48899d86175c3a62a3e8a2a76e9f5ea0e9a3918cf6152',
    name: 'NFT Factory',
    premiumOnly: true,
    stickyOrder: false,
    removable: false,
  },
];

export {
  googleSignIn,
  appleSignIn,
  facebookSignIn,
  defaultChats,
  defaultChatRooms,
  tutorialShowInMenu,
  tutorialStartUponLogin,
  usersEmailsManageEnabled,
};
