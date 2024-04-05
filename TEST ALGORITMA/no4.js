
function matrix_diagonal(matrix){
    let diagonalPertama=0
    let diagonalKedua=0
    for(let i=0; i <matrix.length;i++){
        diagonalPertama = diagonalPertama+matrix[i][i]
        diagonalKedua = diagonalKedua+matrix[i][matrix.length-1-i];
    }

    return Math.abs(diagonalPertama-diagonalKedua)
}

const Matrix = [[1,2,0],[4,5,6],[7,8,9]];
const hasil = matrix_diagonal(Matrix)
console.log(hasil)