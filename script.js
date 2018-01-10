$(document).ready(function(){
  var images = [
    {"url": "imgs/apple.jpg",        "id": 1,  "description": "apple"},
    {"url": "imgs/balloons.jpg",     "id": 2,  "description": "balloons"},
    {"url": "imgs/bananas.jpg",      "id": 3,  "description": "bananas"},
    {"url": "imgs/bottle.jpg",       "id": 4,  "description": "bottle"},
    {"url": "imgs/bread.jpg",        "id": 5,  "description": "bread"},
    {"url": "imgs/cork.jpg",         "id": 6,  "description": "cork"},
    {"url": "imgs/euro.jpg",         "id": 7,  "description": "euro"},
    {"url": "imgs/frog.jpg",         "id": 8,  "description": "frog"},
    {"url": "imgs/pepper.jpg",       "id": 9,  "description": "pepper"},
    {"url": "imgs/piggy-bank.jpg",   "id": 10, "description": "piggy-bank"},
    {"url": "imgs/snowboard.jpg",    "id": 11, "description": "snowboard"},
    {"url": "imgs/soccer.jpg",       "id": 12, "description": "soccer"},
    {"url": "imgs/water.jpg",        "id": 13, "description": "water"},
    {"url": "imgs/world.jpg",        "id": 14, "description": "world"},
    {"url": "imgs/dog.jpg",          "id": 15, "description": "dog"}
  ];
  var pattern = [
    {"url": "imgs/pattern1.jpg",     "description": "pattern1"},
    {"url": "imgs/pattern2.jpg",     "description": "pattern2"},
    {"url": "imgs/pattern3.jpg",     "description": "pattern3"},
    {"url": "imgs/pattern4.jpg",     "description": "pattern4"}
  ]
  var count = 0;
  var midArr;
  var check = pattern[0].url;
  var arrPair = [];

  intial(images);
  function intial(a){
    a.forEach(function(x){
      var item = {};
      item.url = x.url;
      item.id = x.id;
      images.push(item);
    });
    fill();
    converge(images);
  };
  function fill(){
    count = 0;
    images.forEach(function(x){
      count++;
      $(".game-wrap").append('<div class="img-card" id="img'+count+'"></div>');
    });
  };

  function converge(a){
    midArr = [];
    images.forEach(function(x){
      midArr.push(x);
    });
    shuffle(midArr);
  };

  $('.reset').on('click', function(){
    converge(images);
  })

  function shuffle(midArry) {
    $(".img-card").html(null);
    var copy = [], n = midArr.length, i;
    while(n) {
      i = Math.floor(Math.random() * n)
      if (i in midArr) {
        copy.push(midArr[i]);
        midArr.splice(i,1);
        n--;
      };
    };

    count = 0;
    copy.forEach(function(a){
      count++;
      $("#img" + count + "").append('<img class="img" src=' + check + ' alt="Memory Game">');
      $("#img" + count + "").data("obj", {"id": a.id, "status": 0, "url": a.url, "count": count});
    });
  };

$(".img-card").on("click", function(){
  if ($(this).data().obj.status === 0 && arrPair.length < 2) {
    $(this).html('<img class="img" src=' + $(this).data().obj.url + ' alt="Memory Game">').delay(2000);
    $(this).data().obj.status = 1;
    arrPair.push("#img" + $(this).data().obj.count)
    if(arrPair.length === 2){
      var timeout = setTimeout(pairCalc, 1000);
    };
  };
  // console.log($(this).data().obj.id);
});

function pairCalc(){
  var q = arrPair;
  var z = [];
  arrPair = [];
  console.log("hi")
  q.forEach(function(a){
    z.push($(a).data().obj.id);
  })
  if (z[0] === z[1]){
    return console.log("correct!");
  } else {
    q.forEach(function(a){
      $(a).html('<img class="img" src=' + check + ' alt="Memory Game">');
      $(a).data().obj.status = 0;
    })
  }
}

$(".target").on("click", function(){

  $(this).change(function(){
    check = $(this).val();
    pattern.forEach(function(x){
      if(x.description === check){
        check = x.url;
        converge(images);
      }
    })
  })
});


});
