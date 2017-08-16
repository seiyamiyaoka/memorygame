$(function(){
  prepareSquare()
})

const cards = ['volt.png']

let card = {
  image: "",
  isOpen: false
}

function prepareSquare() {
  let mathSize;
  mathSize = 16;
  for(let size = 1; size <= mathSize; size++){
    $('.card-panel').append('<div class="card"><img src="images/volt.png" alt=""></div>')
  }
}
