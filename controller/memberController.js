const {PrismaClient} = require('@prisma/client')
const prisma = new PrismaClient()

const getAllMember = async(req,res) => {

    try{
        const allMember = await prisma.member.findMany()
        res.json(allMember)
    }

    catch(err){
        console.error(err)
        res.status(500).json(err)
    }
   
}

const getMemberById = async(req,res)=>{
    const {id} = req.params

    try{
        const member = await prisma.member.findMany({
            where:{
                member_id:parseInt(id)
            }
        })

        res.json(member)
    }
    catch(err){
        console.error(err)
        res.status(500).json(err)
    }
}

const createMember = async(req,res)=>{
    const {name} = req.body;
    const memberCount = await prisma.member.count();

    try{
        await prisma.member.create({
            data:{
                name:name,
                code:`M-${memberCount}`
            }
        })
        console.log("Success")
        res.json({info:'Member berhasil dibuat'})
    }

    catch(err){
        console.error(err)
        res.status(500).json(err)
    }
}

const deleteMember = async(req,res)=>{
    const id = req.params
    try{
        await prisma.member.delete({
            where:{
                member_id:parseInt(id)
            }
        })

        res.json('Success')
    }
    catch(err){
        res.status(500).json(err)
    }
}

module.exports = {
    getAllMember, getMemberById, createMember, deleteMember
}