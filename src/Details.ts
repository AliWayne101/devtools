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

export interface CompProps {
  MountedData: ICreatorData,
  ClosingButton: boolean
}

export type ICreatorData = {
  notifName: string;
  notifTitle: string;
  notifDesc: string;
  notifNPlaceholder: string;
  notifEPlaceholder: string;
  notifButton: string;
  notifRedirect: string;
  notifImg1: string;
  notifLink1: string;
};

export const defaultEmpty = {
  notifName: "",
  notifTitle: "",
  notifDesc: "",
  notifNPlaceholder: "",
  notifEPlaceholder: "",
  notifButton: "",
  notifRedirect: "",
  notifImg1: "",
  notifLink1: "",
};

export let defaultEmailData = {
  notifName: "My new notification",
  notifTitle: "Weekly newsletter",
  notifDesc:
    "We do not send out spam emails & you can unsubscribe at any point.",
  notifNPlaceholder: "Your name",
  notifEPlaceholder: "Your email",
  notifButton: "Sign me up",
  notifRedirect: "",
  notifImg1: "",
  notifLink1: "",
};

export let defaultFlashData = {
  notifName: "My new notification",
  notifTitle: "Hot Sale!",
  notifDesc: "Check out our discounted hot sale.",
  notifNPlaceholder: "shopping_bag",
  notifEPlaceholder: "",
  notifButton: "",
  notifRedirect: "",
  notifImg1: `${Web.Server}/assets/dt_handbag.jpg`,
  notifLink1: "",
};

export type notifHelp = {
  campignID: string;
  userID: string;
  onCompleted: (status: boolean) => void;
};

export type creatorProps = {
  campaignID: string;
  userID: string;
  Tag: string;
  onCompleted: (status: boolean) => void;
};
