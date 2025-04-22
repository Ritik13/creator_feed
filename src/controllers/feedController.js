import slugify from "slugify";
import { Feed } from "../models/index.js";

export const createFeed = async (req, res) => {
    console.info("In Feed Controlelr")
    try {
        const { title, content, imageUrl, status, slug } = req.body;
        let slg = slug || slugify(title, {
            lower: true,
            replacement: '_',
            trim: true
        });

        let count = 1;
        let slugExist = await Feed.findOne({ where: { slug: slg } });
        while (slugExist) {
            slg = `${slugify(title, { lower: true })}-${count}`;
            slugExist = await Feed.findOne({ where: { slug: slg } });
            count++;
        }

        const result = await Feed.create({
            title,
            content,
            imageUrl,
            status,
            slug: slg,
            userId: req.user.id
        })

        if (result) res.status(200).send({ message: "Created feed" });
        else res.status(400).send({ message: "Cannot create feed" });
    } catch (err) {
        return res.status(500).send({ 'error': err.message });
    }

}


export const getFeed = async (req, res) => {
    const limit = parseInt(req.query.limit) || 10;
    const page = parseInt(req.query.page) || 1;
    const offset = (page - 1) * limit;

    const { q, status } = req.query;

    const where = {
        isDeleted: false,
        ...(q && {
            title: {
                [Op.iLike]: `%${q}%`,
            },
        }),
        ...(status && {
            status,
        }),
    };

    try {
        const { count, rows: feeds } = await Feed.findAndCountAll({
            where,
            limit,
            offset,
            order: [['createdAt', 'DESC']],
        });

        res.status(200).json({
            currentPage: page,
            totalPages: Math.ceil(count / limit),
            totalCount: count,
            feeds,
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};


export const patchFeed = async (req, res) => {
    const feedId = req.params.id;
    const { title, content, imageUrl, status } = req.body;

    try {
        const feed = await Feed.findByPk(feedId);
        if (!feed || feed.isDeleted) return res.status(404).json({ error: "Feed not found" });

        if (feed.userId !== req.user.id) {
            return res.status(403).json({ error: "Unauthorized" });
        }

        await feed.update({ title, content, imageUrl, status });
        res.status(200).json({ message: "Feed updated successfully" });

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};


export const deleteFeed = async (req, res) => {
    const feedId = req.params.id;

    try {
        const feed = await Feed.findByPk(feedId);
        if (!feed || feed.isDeleted) return res.status(404).json({ error: "Feed not found" });

        if (feed.userId !== req.user.id) {
            return res.status(403).json({ error: "Unauthorized" });
        }

        await feed.update({ isDeleted: true });
        res.status(200).json({ message: "Feed deleted (soft)" });

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};


export const restoreFeed = async (req, res) => {
    const feedId = req.params.id;
    const role = req.user.role;

    try {
        const feed = await Feed.findByPk(feedId);

        if (!feed) {
            return res.status(404).json({ error: "Feed not found" });
        }

        if (role !== 'admin') {
            return res.status(403).json({ error: "Unauthorized: admin only" });
        }

        await feed.update({ isDeleted: false });
        res.status(200).json({ message: "Feed restored successfully" });

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};


export const insertBulkPost = async (req, res) => {
    try {
        const collection = req.body;
        for (const element of collection) {
            const { title, content, imageUrl, status, slug } = element;
            let slg = slug || slugify(title, {
                lower: true,
                replacement: '_',
                trim: true
            });

            let count = 1;
            let slugExist = await Feed.findOne({ where: { slug: slg } });
            while (slugExist) {
                slg = `${slugify(title, { lower: true })}-${count}`;
                slugExist = await Feed.findOne({ where: { slug: slg } });
                count++;
            }
           await Feed.create({
                title,
                content,
                imageUrl,
                status,
                slug: slg,
                userId: req.user.id
            })
        };

       res.status(200).send({ message: "Created feed" });
    } catch (err) {
        return res.status(500).send({ 'error': err.message });
    }
}
