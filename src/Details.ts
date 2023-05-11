export type iTier = {
  ALLOWED_CAMPAIGNS: number;
  ALLOWED_IMPS: number;
  ALLOWED_NOTIFICATIONS: number;
};

export const Tier = [
  {
    ALLOWED_CAMPAIGNS: 5,
    ALLOWED_IMPS: 100000,
    ALLOWED_NOTIFICATIONS: 25,
    Membership: "Free",
  },
  {
    ALLOWED_CAMPAIGNS: 100,
    ALLOWED_IMPS: 100000000,
    ALLOWED_NOTIFICATIONS: 2500,
    Membership: "Admin",
  },
];

export const Web = {
  Name: "DevTools",
  Server: "https://devtools-wayne.vercel.app",
};

export const generateID = (length: number) => {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
};


export type notifHelp = {
  campignID: string,
  userID: string,
  onCompleted: (status: boolean) => void;
}