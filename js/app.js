let answerResult = [];
let correctAnswerCount = 0;
let answerCount = 0;

$(function(){
  prepareSquare()
  setStar()
  moveCount()
  openCard()
  reload()
  pageReload()
})


class Card {
  constructor(){
    this.image = "",
    this.isOpen = false
  }
}

function reload(){
  $('.reload').on('click', function(){
    $(this.children).addClass('fa-spin')
    $(this.children).delay(1000).queue(function() {
    　　$(this).toggleClass('fa-spin').dequeue();
    });
    answerResult = [];
    answerCount = 0;
    correctAnswerCount = 0;
    $('.card').remove()
    prepareSquare()
    $('.evaluation').children().not('.answerTime').removeClass()
    $('.evaluation').children().not('.answerTime').addClass('fa fa-star-o')
    $('.answerTime').text(`: ${answerCount} move count`)
  })
}

function checkAnswer(answers) {
  if (answers[0] === answers[1]){
    correctAnswerCount += 1
    answerResult = [];
    if(correctAnswerCount === 8){
      $('h2').text("congraturation!!")
      $('.card-panel').fadeOut()
      $('.container').last().append($(`<div class="congraturatioin">your clear time ${answerCount}!</div><div class="resetButton"><button type="button" class="btn btn-primary">retry?</button></div>`)).fadeIn()
    }
  } else {
    // answerCount = 0;
    $('.card').each(function(){
      correctAnswerCount = 0;
      if($(this.children).attr('class').length <= 0){
        $(this.children).delay(1000).queue(function() {
        　　$(this).toggleClass('flip-over').dequeue();
        answerResult = [];
        });
      }
    })
  }
}

function pageReload(){
  $('.container').on('click', '.btn', function(){
    location.reload();
  })
}

function openCard() {
  $('.card-panel').on('click', '.card', function(e) {
    console.log(1)
    $(e.target.children).removeClass('flip-over')
    answer = $(e.target.children[0]).find('img').attr('alt')
    answerResult.push(answer)
    if (answerResult.length === 2){
      answerCount += 1
      changeStarColor(answerCount);
      $('.answerTime').text(`: ${answerCount} move count`)
      checkAnswer(answerResult)
    }
  })
}

function changeStarColor(count) {
  let first, second, third;
  first = $('.evaluation').children().eq(0),
  second = $('.evaluation').children().eq(1),
  third = $('.evaluation').children().eq(2)
  switch(count) {
    case 5:
      first.removeClass('fa-star-o')
      first.addClass('fa-star')
      break
    case 10:
      second.removeClass('fa-star-o')
      second.addClass('fa-star')
      break
    case 15:
      third.removeClass('fa-star-o')
      third.addClass('fa-star')
      break
  }
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
  }
}

function setStar() {
  star = '<i class="fa fa-star-o" aria-hidden="true"></i>'
  let starNumber = 3;
  for(let time = 0; time < 3; time ++){
    $('.evaluation').append(star)
  }
}

function moveCount(){
  countHTML = $(`<div class="answerTime">: ${answerCount} move count</div>`)
  target = $('.evaluation').children().last()
  target.after(countHTML)
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
  cards[1].forEach((card) => {
    card_list.push(`<div class="card"><div class="flip-over"><img src="images/${card}" alt=${card}></div></div>`)
  })
  return card_list
}
