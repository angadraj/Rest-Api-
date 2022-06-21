const { Post } = require('../models/index');

module.exports.createPost = async function createPost(req, res) {
    try {
        if (!req.body.title && !req.body.content) {
            return res.status(400).json({
                message: "Please enter title and content"
            });
        }
        const savedPost = await Post.create({
            title: req.body.title,
            content: req.body.content,
            userId: req.body.userId
        });
        return res.status(200).json({
            message: "Post created!",
            data: savedPost
        });
    } catch (e) {
        return res.status(500).json({
            message: e.message
        })
    }
}