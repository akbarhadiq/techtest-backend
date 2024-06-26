const {PrismaClient} = require('@prisma/client')
const prisma = new PrismaClient()

const getAllMember = async(req,res) => {
    // #swagger.tags = ['Member']
    // #swagger.summary = 'Ambil Data Member Basic'
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
    // #swagger.tags = ['Member']
    // #swagger.summary = 'Ambil Data Member Berdasarkan ID - Basic'
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

const getMemberByIdWithBorrowedBooks = async(req,res)=>{
    // #swagger.tags = ['Member']
    // #swagger.summary = 'Ambil Data Member, Dengan Buku Yang Mereka Pinjam'
    const {id} = req.params
    try{
        const member = await prisma.member.findUnique({
            where:{
                member_id:parseInt(id)
            },
            include:{
                borrowedBooks:{
                    include:{
                        Book:true
                    }
                }
            }
        })

        if(!member){
            return res.status(404).json({Info : 'Member tidak dapat ditemukan'})
        }

        member.borrowed_books_count = member.borrowedBooks.length
        return res.json(member)
    }
    catch(err){
        console.error(err)
        res.status(500).json(err)
    }
}

const createMember = async(req,res)=>{
    // #swagger.tags = ['Member']
    // #swagger.summary = 'Tambah Data Member'
        /* #swagger.requestBody = {
            required: true,
            content: {
                "application/json": {
                    schema: { $ref: "#/components/schemas/MemberSchema" },
                    example: { 
                        name:"Fernando Alonso"
                    }
                }
            }
        }
    */
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
    // #swagger.tags = ['Member']
    // #swagger.summary = 'Hapus Data Member'
    const id = req.params
    try{
        await prisma.member.deleteMany({
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
    getAllMember, getMemberById, createMember, deleteMember,
    getMemberByIdWithBorrowedBooks
}