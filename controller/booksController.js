const {PrismaClient} = require('@prisma/client')
const prisma = new PrismaClient()

const getAllBooks = async(req,res)=>{
    try{
        let allBooks = await prisma.book.findMany()

        // filter buku yang dipinjam (habis)
        allBooks = allBooks.filter(book=>book.stock>0);
        res.json(allBooks)
    }
    catch(err){
        console.error(err)
        res.status(500).json(err)
    }
}

const getBookById = async(req,res) => {
    const {id} = req.params
    try{
        const book = await prisma.book.findMany({
            where:{
                book_id:parseInt(id)
            }
        })

        if(book.length === 0) {
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

    if(!title || !stock || !code){
        return res.status(401).json({Info : 'Data buku tidak lengkap'})
    }
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
    const {id} = req.params
    const {title, stock,code} = req.body

    try{

        const book = await prisma.book.findUnique({
            where:{
                book_id:parseInt(id)
            }
        })

        if(!book){
            return res.status(404).json({info:"Buku tidak ditemukan"})
        }

        console.log(book)
        await prisma.book.update({
            where:{
                book_id:parseInt(id)
            },
            data:{
                title:title,
                stock:stock,
                code:code
            }
        })

        return res.json({Info:'Buku berhasil di update'})

    }
    catch(err){
        console.error(err)
        res.status(500).json(err)
    }
}

const deleteBook = async(req,res) =>{
    const {id} = req.params
    try {
        const checkBook = await prisma.book.findUnique({
            where:{
                book_id:parseInt(id)
            }
        })

        if(!checkBook){
            return res.status(404).json('Buku tidak ditemukan')
        }

        await prisma.book.delete({
            where:{
                book_id:parseInt(id)
            }
        })

        res.json({info : 'Buku berhasil dihapus.'})
    }
    catch(err){
        console.error(err)
        res.status(500).json(err)
    }
}

module.exports = {
 getAllBooks, getBookById, addNewBook, updateBook, deleteBook 
}

