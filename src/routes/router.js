const router = require('express').Router()
const UrlModel = require('../models/urlmodel.js')
let counter = 1

const regex = /https:?\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/gi

router.post('/', async (req, res) => {
    const url = req.body.url
    const test = regex.test(url)
    if (!test) return res.json({ error: 'Invalid URL' })
    const doc = await UrlModel.findOne({ original_url: url })
    if (doc) {
        return res.json({
            original_url: doc.original_url,
            short_url: doc.short_url
        })
    }
    const newDoc = await UrlModel.create({
        original_url: url,
        short_url: Math.round(Math.random() * 1000)
    })
    //TODO: fix the invalid response (needs to reload to save the doc)
    newDoc.save()
    return res.json({
        original_url: newDoc.original_url,
        short_url: newDoc.short_url
    })
})

router.get('/:shortener', async (req, res) => {
    const shortener = req.params.shortener
    const doc = await UrlModel.findOne({short_url: shortener})
    return res.redirect(doc.original_url)
})

module.exports = router

