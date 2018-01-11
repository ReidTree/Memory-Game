$(document).ready(function(){
  var images = [
    {"url": "media/apple.jpg",        "id": 1,  "description": "apple"},
    {"url": "media/balloons.jpg",     "id": 2,  "description": "balloons"},
    {"url": "media/bananas.jpg",      "id": 3,  "description": "bananas"},
    {"url": "media/bottle.jpg",       "id": 4,  "description": "bottle"},
    {"url": "media/bread.jpg",        "id": 5,  "description": "bread"},
    {"url": "media/cork.jpg",         "id": 6,  "description": "cork"},
    {"url": "media/euro.jpg",         "id": 7,  "description": "euro"},
    {"url": "media/frog.jpg",         "id": 8,  "description": "frog"},
    {"url": "media/pepper.jpg",       "id": 9,  "description": "pepper"},
    {"url": "media/piggy-bank.jpg",   "id": 10, "description": "piggy-bank"},
    {"url": "media/snowboard.jpg",    "id": 11, "description": "snowboard"},
    {"url": "media/soccer.jpg",       "id": 12, "description": "soccer"},
    {"url": "media/water.jpg",        "id": 13, "description": "water"},
    {"url": "media/world.jpg",        "id": 14, "description": "world"},
    {"url": "media/dog.jpg",          "id": 15, "description": "dog"}
  ];
  var pattern = [
    {"url": "media/pattern1.jpg",     "description": "pattern1"},
    {"url": "media/pattern2.jpg",     "description": "pattern2"},
    {"url": "media/pattern3.jpg",     "description": "pattern3"},
    {"url": "media/pattern4.jpg",     "description": "pattern4"}
  ];

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
    $(".media").remove();
    midArr = [];
    images.forEach(function(x){
      midArr.push(x);
    });
    shuffle(midArr);
  };

  $('.reset').on('click', function(){
    converge(images);
  });

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
      var timeout = setTimeout(pairCalc, 500);
    };
  };
});

function pairCalc(){
  var q = arrPair;
  var z = [];
  arrPair = [];
  q.forEach(function(a){
    z.push($(a).data().obj.id);
  });
  if (z[0] === z[1]){
    end();
    return console.log("correct!");
  } else {
    q.forEach(function(a){
      $(a).html('<img class="img" src=' + check + ' alt="Memory Game">');
      $(a).data().obj.status = 0;
    });
  };
};

$(".target").on("click", function(){

  $(this).change(function(){
    check = $(this).val();
    pattern.forEach(function(x){
      if(x.description === check){
        check = x.url;
        converge(images);
      };
    });
  });
});

function end(){
  var clean = 0;
  count = 0;
  images.forEach(function(a){
    count++;
    clean += $("#img"+ count).data().obj.status;
  });
  if (clean === 30){
    $(".game-wrap").append('<div class="media"><img class="firework" src="media/giphy.webp"><audio id="cheer" src="media/cheer.mp3"><source src="media/cheer.mp3" type="audio/mpeg"></audio></div>')
    document.getElementById("cheer").play();
  }
}

});
