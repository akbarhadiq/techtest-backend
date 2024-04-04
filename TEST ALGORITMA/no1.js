let text = "NEGIE1"

function reverse (textToReverse){
    characters_array = []
    num_array = []
    for(let i=0;i<textToReverse.length;i++){
        character = textToReverse[i]
        if(isNaN(character)){
            characters_array.push(character)
        }
        else{
            num_array.push(character)
        }
    }

    reverse_string = `${characters_array.reverse().join("")}${num_array.join("")}`

    // console.log(characters_array)
    // console.log(num_array)
    // console.log(reverse_string)

    return reverse_string
}

console.log(reverse(text))