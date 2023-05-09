export type iTier = {
    ALLOWED_CAMPAIGNS: number,
    ALLOWED_IMPS: number,
    ALLOWED_NOTIFICATIONS: number,
}

export const Tier = {
    Free:  {
        ALLOWED_CAMPAIGNS: 5,
        ALLOWED_IMPS: 100000,
        ALLOWED_NOTIFICATIONS: 25,
    }
}

export const Web = {
    Name: "DevTools",
    Server: "https://devtools-wayne.vercel.app"
}