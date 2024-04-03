const {PrismaClient} = require('@prisma/client')
const prisma = new PrismaClient()

const getAllBooks = async(req,res)=>{
    try{
        const allBooks = await prisma.book.findMany()
        res.json(allBooks)
    }
    catch(err){
        console.error(err)
        res.status(500).json(err)
    }
}

const getBookById = async(req,res) => {
    const id = req.params
    try{
        const book = await prisma.book.findMany({
            where:{
                book_id:id
            }
        })

        if(!book) {
            return res.status(404).json({info : 'Buku tidak Ditemukan'})
        }

        return res.json(book)
    }

    catch(err){
        console.error(err)
        res.status(500).json(err)
    }
}

const addNewBook = async(req,res) => {
    const {title, stock, code} = req.body
    try{

        const isBookAlreadyAvailable = await prisma.book.findFirst({
            where:{
                title:title
            }
        })

        if (isBookAlreadyAvailable){
            return res.json({info:'Buku dengan Titel tersebut sudah ada.'})
        }

        await prisma.book.create({
            data:{
                title:title,
                code:code,
                stock:stock
            }
        })

        res.json({info:'Buku berhasil dibuat'})

    }
    catch(err){

    }
}

const updateBook = async(req,res) => {
    const id = req.params
    const {title, stock,code} = req.body

    try{
        const book = await prisma.findMany({
            where:{
                book_id:id
            }
        })

        if(!book){
            return res.status(404).json({info:"Buku tidak ditemukan"})
        }

        await prisma.book.update({
            where:{
                book_id:id
            },
            data:{
                title:title,
                stock:stock,
                code:code
            }
        })


    }
    catch(err){
        console.error(err)
        res.status(500).json(err)
    }
}

const deleteBook = async(req,res) =>{
    const id = req.params
    try {
        const checkBook = await prisma.book.findMany({
            where:{
                book_id:id
            }
        })

        if(!checkBook){
            return res.status(404).json('Buku tidak ditemukan')
        }

        await prisma.book.delete({
            where:{
                book_id:id
            }
        })
    }
    catch(err){
        console.error(err)
        res.status(500).json(err)
    }
}

module.exports = {
 getAllBooks, getBookById, addNewBook, updateBook, deleteBook 
}

