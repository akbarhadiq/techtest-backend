const sentence = "Saya sangat senang mengerjakan soal algoritma"
// console.log(sentences_array)

function longest(sentences){
    const sentences_array = sentences.split(" ")
    let longest_index = 0
    for(let i=0; i<sentences_array.length; i++){
        if (sentences_array[i].length > sentences_array[longest_index].length){
            longest_index = i
        }
    }
    console.log(`// ${sentences_array[longest_index]}: ${sentences_array[longest_index].length} character`)
}

longest(sentence)