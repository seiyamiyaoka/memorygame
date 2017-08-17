let answerResult = [];
let answerCount = 0;
$(function(){
  prepareSquare()
  openCard()
  reload()
})


class Card {
  constructor(){
    this.image = "",
    this.isOpen = false
  }
}

function reload(){
  $('.reload').on('click', function(){
    console.log(1)
    answerResult = [];
    answerCount = 0;
    $('.card').remove()
    prepareSquare()
  })
}

function checkAnswer(answers) {
  console.log(1)
  if (answers[0] === answers[1]){
    answerCount += 1
    answerResult = [];
    if(answerCount === 8){
      $('h2').text("congraturation!!")
    }
  } else {
    answerCount = 0;
    $('.card').each(function(){
      if($(this.children).attr('class').length <= 0){
        $(this.children).delay(1000).queue(function() {
        　　$(this).toggleClass('flip-over').dequeue();
        answerResult = [];
        });
      }
    })
  }

}

// let card = {
//   isOpen: false,
//   image: "",
//   open: function() {
//     if(this.isOpen){
//       image
//     }else{
//       "images/tranp.jpeg"
//     }
//   }
// }

function cardSet() {

}

function openCard() {
  $('.card-panel').on('click', '.card', function(e) {
    console.log(1)
    $(e.target.children).removeClass('flip-over')
    answer = $(e.target.children[0]).find('img').attr('alt')
    answerResult.push(answer)
    if (answerResult.length === 2){
      checkAnswer(answerResult)
    }
  })
}

function prepareSquare() {
  let mathSize
  let cardList = setCardList()
  let allCard = cardList.concat(cardList)
  allCard.sort(function(){
    return Math.random() - Math.random()
  })
  mathSize = 16

  card_data = []
  for (let size = 1; size <= mathSize; size++) {
    card = new Card();
    card.image = allCard[size -1]
    card_data.push(card)
    $('.card-panel').append(allCard[size -1])
    console.log(1)
  }
}

function setCardList() {
  card_list = []
  const cards = [['volt.png',
                 'volt.jpeg',
                 'girl.png',
                 'komajirou.png',
                 'hamu.jpeg',
                 'inu.jpeg',
                 'neko.jpeg',
                 'same.jpeg']
                 ,[
                   'goya1.jpeg',
                   'goya2.jpeg',
                   'goya3.jpeg',
                   'goya4.jpeg',
                   'goya5.jpeg',
                   'goya6.jpeg',
                   'goya7.jpeg',
                   'goya8.jpeg'
                 ]
                ]
  cards[0].forEach((card) => {
    card_list.push(`<div class="card"><div class="flip-over"><img src="images/${card}" alt=${card}></div></div>`)
  })
  return card_list
}
