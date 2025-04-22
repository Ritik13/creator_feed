import { Feed } from "../models/index.js"

export const getFeedAnalytics = async (req ,res) => {
    try {
        const publishedFeed = await Feed.count({where : { status : "published"}});
        const draftFeed = await Feed.count({where : { status : "draft"}});
        const totalFeed = await Feed.count();

        res.status(200).send({message: "success" , counts : {publishedFeed , draftFeed, totalFeed}})

    } catch (err) {
        res.status(500).send({error : err})
    }
}
