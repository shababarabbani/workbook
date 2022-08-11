const express = require('express')
const router = express.Router();
const { ensureAuth } = require('../middleware/auth');

const Experience = require('../models/Experience')

// @desc  Show add experience page
// @route GET /experiences/add
router.get('/add', ensureAuth, (req, res)=>{
    res.render('experiences/add')
})

// @desc  Process add interview form
// @route POST /experiences
router.post('/', ensureAuth, async (req, res)=>{
    try {
        req.body.user = req.user.id
        await Experience.create(req.body)
        res.redirect('/dashboard')
    } catch (err) {
        console.log(err)
        res.render('error/500')
    }
})

// @desc  Show all experiences
// @route GET /experiences
router.get('/', ensureAuth, async (req, res)=>{
    try {
        const experiences = await Experience.find({ status: 'Public' })
            .populate('user')
            .sort({ createdAt: 'desc' })
            .lean()

        res.render('experiences/index', {
            experiences
        })
    } catch (err) {
        console.log(err)
        res.render('error/500')
    }
})

// @desc  Show single experience
// @route GET /experiences/:id
router.get('/:id', ensureAuth, async (req, res)=>{
    try {
        let experience = await Experience.findById(req.params.id)
        .populate('user')
        .lean()

        if(!experience){
            return res.render('error/404')
        }

        res.render('experiences/show', {
            experience
        })
    } catch (err) {
        console.log(err)
        res.render('error/404')
    }
})

// @desc  Show edit page
// @route GET /experiences/edit/:id
router.get('/edit/:id', ensureAuth, async (req, res)=>{
    try {
        const experience = await Experience.findOne({
            _id: req.params.id
        }).lean()
    
        if(!experience){
            return res.render('error/404')
        }
    
        if(experience.user != req.user.id){
            res.redirect('/experiences')
        }
        else{
            res.render('experiences/edit',{
                experience
            })
        }
    } catch (error) {
        console.log(err)
        res.render('error/500')
    }
})

// @desc  Update experience
// @route PUT /experiences/:id
router.put('/:id', ensureAuth, async (req, res)=>{
    try {
        let experience = await Experience.findById(req.params.id).lean()

        if(!experience){
            return res.render('error/404')
        }

        if(experience.user != req.user.id){
            res.redirect('/experiences')
        }
        else{
            experience = await Experience.findOneAndUpdate({ _id: req.params.id }, req.body, {
                new: true,
                runValidators: true
            })

            res.redirect('/dashboard')
        }
    } catch (error) {
        console.log(err)
        res.render('error/500')
    }
})

// @desc  Delete experience
// @route DELETE /experiences/:id
router.delete('/:id', ensureAuth, async (req, res)=>{
    try {
        await Experience.deleteOne({ _id: req.params.id })
        res.redirect('/dashboard')
    } catch (err) {
        console.log(err)
        res.render('error/500')
    }
})

// @desc  All user experiences
// @route GET /experiences/user/:id
router.get('/user/:userId', ensureAuth, async (req, res)=>{
    try {
        const experiences = await Experience.find({
            user: req.params.userId,
            status: 'Public'
        })
        .populate('user')
        .lean()

        res.render('experiences/index', {
            experiences
        })
    } catch (err) {
        console.log(err)
        res.render('error/500')
    }
})

module.exports = router;