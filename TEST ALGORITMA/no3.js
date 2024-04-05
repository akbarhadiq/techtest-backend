const query = ['bbb', 'ac', 'dz']
const input = ['xc', 'dz', 'bbb', 'dz']

function check(queryList, inputList){
    let hasil = []
    for(let query of queryList){
        let muncul = inputList.filter(item=>item===query).length
        hasil.push(muncul)
    }

    return hasil
}

console.log(check(query, input))