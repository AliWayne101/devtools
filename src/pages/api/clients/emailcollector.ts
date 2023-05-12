import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler (
    req: NextApiRequest,
    res: NextApiResponse
) {
    //on post request, check if link has feedback url meanwhile save the data
    
    res.setHeader("Content-Type", "application/javascript");
    const ref = req.headers.referer;
    res.status(200).send(`console.log('${ref}');`);
}