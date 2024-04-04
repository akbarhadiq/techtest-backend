const {PrismaClient} = require('@prisma/client')
const prisma = new PrismaClient()
const {DateTime} = require('luxon')

// Pinjam Buku
const borrowBooks = async(req,res) => {
    const {member_id, book_id} = req.body

    try{
        const member = await prisma.member.findUnique({
            where:{
                member_id:parseInt(member_id)
            },
            include:{
                borrowedBooks:true
            }
        })
    
    
        // check if member exist
        if(!member){
            return res.status(401).json({Info:'Member tersebut tidak ada!'})
        }
    
        // check berapa banyak buku yang member pinjam
        if(member.borrowedBooks.length >2){
            return res.status(401).json({Info : 'Member tidak dapat meminjam lebih dari satu buku.'})
        }
    
        // cek apakah member memiliki penalti
        if(member.penalty_status === true){
            return res.status(401).json({info : 'Member terkena penalti dan tidak bisa meminjam buku selama 3 hari.'})
        }
    
        // cek apakah buku ada
        const bookToBorrow = await prisma.book.findUnique({
            where:{
                book_id:parseInt(book_id)
            }
        })
    
        if(!bookToBorrow){
            return res.status(404).json({info : 'Buku yang ingin dipinjam tidak ditemukan'})
        }
    
        // cek apakah buku masih ada quantity nya
        if(bookToBorrow.stock <1){
            return res.status(401).json({info : 'Buku habis dipinjam'})
        }
    
        // jika berhasil maka pinjamkan buku
        
        // kurangi jumlah stok buku
        await prisma.book.update({
            where:{
                book_id:parseInt(book_id)
            },
            data :{
                stock:bookToBorrow.stock - 1
            }
        })
    
        // masukan data buku ke dalam buku yang sedang dipinjam
    
        await prisma.borrowedBook.create({
            data:{
                book_id:parseInt(book_id),
                member_id:parseInt(member_id),
                borrow_date:DateTime.now().setZone('Asia/Jakarta')
            }
        })
    
        res.json({Info : `${member.name} meminjam buku ${bookToBorrow.title}`})
    
        // res.json(member)
    }
    catch(err){
        console.error(err)
        res.status(500).json(err)
    }

    
}

// Return Buku
const returnBooks = async(req,res)=>{
    res.send('Hello!')
}

module.exports = {
    borrowBooks, returnBooks
}