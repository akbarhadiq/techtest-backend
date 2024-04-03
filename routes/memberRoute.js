const express = require('express')
const memberRouter = express.Router()
const {getAllMember, getMemberById, createMember, deleteMember} = require('../controller/memberController') 

// 
memberRouter.get('/member', getAllMember)
memberRouter.get('/member/:id', getMemberById)
memberRouter.post('/member', createMember)
memberRouter.delete('/member/:id', deleteMember)

module.exports = memberRouter