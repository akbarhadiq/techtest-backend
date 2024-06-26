const {PrismaClient} = require('@prisma/client')
const prisma = new PrismaClient()
const {DateTime} = require('luxon')

// Pinjam Buku
const borrowBooks = async(req,res) => {
    // #swagger.tags = ['Meminjam Buku']
    // #swagger.summary = 'Meminjam Buku'
        /* #swagger.requestBody = {
            required: true,
            content: {
                "application/json": {
                    schema: { $ref: "#/components/schemas/BorrowDataSchema" },
                    example: { 
                        member_id:1,
                        book_id:4
                    }
                }
            }
        }
    */
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
    // #swagger.tags = ['Mengembalikan Buku']
    // #swagger.summary = 'Mengembalikan Buku'
     /* #swagger.requestBody = {
            required: true,
            content: {
                "application/json": {
                    schema: { $ref: "#/components/schemas/BorrowDataSchema" },
                    example: { 
                        member_id:1,
                        book_id:4
                    }
                }
            }
        }
    */
    // res.send('Hello!')
    const {member_id , book_id} = req.body
    try{

        const return_date = DateTime.now().setZone("Asia/Jakarta")

        const borrowed_books = await prisma.borrowedBook.findMany({
            where:{
                member_id:parseInt(member_id)
            }
        })
    
        if(!borrowed_books){
            res.status(404).json({Info:"Member tidak meminjam buku."})
        }
    
        // check apakah buku yang di return ada dalam borrowed books
        const checkBookReturn = (bookId) => borrowed_books.some(book=>book.book_id = bookId)
        if(!checkBookReturn){
            return res.status(400).json({Info:'User tidak meminjam buku ini'})
        }

        // check waktu pengembalian, jika pengembalian lebih dari 7 hari maka status penalti menjadi true

        let borrow_date = borrowed_books[0].borrow_date
        // console.log(borrow_date)
        borrow_date = DateTime.fromJSDate(borrow_date)
        // console.log(borrow_date)

        // console.log(return_date)

        const jarak_hari = return_date.diff(borrow_date, 'days').days
        // console.log(jarak_hari)

        // jarak lebih besar dari 7 hari
        if(jarak_hari >= 7) {
            // penalty user
            await prisma.member.update({
                where:{
                    member_id:parseInt(member_id)
                },
                data:{
                    penalty_status:{
                        set:true
                    }
                }
            })

            // masukan userBorrow history
            await prisma.userBorrowHistory.create({
                data:{
                    borrow_date:borrow_date,
                    return_date:return_date,
                    penalty_applied:true,
                    member_id:member_id,
                    book_id:book_id
                }
            })

            // kembalikan stock buku
            await prisma.book.update({
                where:{
                    book_id:parseInt(book_id)
                },
                data:{
                    stock:{
                        increment:1
                    }
                }
            })

            // hapus data peminjaman
            await prisma.borrowedBook.deleteMany({
                where:{
                    member_id:parseInt(member_id),
                    book_id:parseInt(book_id)
                }
            })

            return res.json({Info:'Berhasil mengembalikan buku, user terkena penalti karena mengembalikan lebih dari 7 hari'})
        }

        // kalau kurang dari 7 hari return secara normal

        // masukan userBorrow history
        await prisma.userBorrowHistory.create({
            data:{
                borrow_date:borrow_date,
                return_date:return_date,
                penalty_applied:false,
                member_id:member_id,
                book_id:book_id
            }
        })

        // kembalikan stock buku
        await prisma.book.update({
            where:{
                book_id:book_id
            },
            data:{
                stock:{
                    increment:1
                }
            }
        })

        // hapus data peminjaman
        await prisma.borrowedBook.deleteMany({
            where:{
                member_id:member_id,
                book_id:book_id
            }
        })

        res.json({Info : 'Buku berhasil dikembalikan'})
        
    }
    catch(err){
        console.error(err)
        res.status(500).json(err)
    }
   
}

module.exports = {
    borrowBooks, returnBooks
}