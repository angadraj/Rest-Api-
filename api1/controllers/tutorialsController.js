const db = require('../models/index');
const tutorials = db.tutorials;
const Op = db.Op;

async function createTut(req, res) {
    try {
        console.log(req.body);
        if (!req.body.title) {
            res.status(400).json({
                message: "content can't be empty!"
            });
            return;
        }
        const tut = {
            title: req.body.title,
            description: req.body.description,
            published: req.body.published
        }
        const createdTut = await tutorials.create(tut);
        res.status(200).json({
            message: "tut created!",
            data: createdTut
        })
    } catch (e) {
        res.status(500).json({
            message: e.message
        })
    } 
}

async function findAll(req, res) {
    try {
        const tuts = await tutorials.findAll();
        res.status(200).json({
            message: 'All tutorials found',
            data: tuts
        })
    } catch (e) {
        res.status(500).json({
            message: e.message
        })
    }
}

async function findOne(req, res) {
    try {
        const id = req.params.id;
        const tut = await tutorials.findByPk(id);
        if (!tut) {
            return res.status(400).json({
                message: "Tutorial does not exists"
            })
        }
        res.status(200).json({
            message: "tut found!",
            data: tut
        })
    } catch (e) {
        res.status(500).json({
            message: e.message
        })
    }
}

async function update(req, res) {
    try {
        const id = req.params.id;
        const updatedTut = await tutorials.update(req.body, {
            where: { id: id }
        });
        if (!updatedTut) {
            return res.status(400).json({
                message: "tutorial not found!"
            })
        }
        res.status(200).json({
            message: "tut updated!",
            data: updatedTut
        })
    } catch (e) {
        res.status(500).json({
            message: e.message
        });
    }
}

async function deleteOne(req, res) {
    try {
        const id = req.params.id;
        const deletedTut = await tutorials.destroy({
            where: { id: id }
        });
        if (!deletedTut) {
            res.status(400).json({
                message: "tutorial to be deleted not found!"
            })
        }
        res.status(200).json({
            message: "tut deleted",
            data: deletedTut
        })
    } catch (e) {
        res.status(500).json({
            message: e.message
        })
    }
}

async function deleteAll(req, res) {
    try {
        await tutorials.destroy({
            where: {},
            truncate: false
        });
        res.status(200).json({
            message: "all tuts deleted!"
        })
    } catch (e) {
        res.status(500).json({
            message: e.message
        })
    }
}

async function findAllPublished(req, res) {
    try {
        const publishedTuts = await tutorials.findAll({
            where: {
                published: {
                    [Op.eq]: true
                }
            }
        });
        res.status(200).json({
            message: "All published tuts",
            data: publishedTuts
        })
    } catch (e) {
        res.status(500).json({
            message: e.message
        })
    }
}

module.exports = {
    createTut,
    findAll,
    findOne,
    update,
    deleteOne,
    deleteAll,
    findAllPublished
};