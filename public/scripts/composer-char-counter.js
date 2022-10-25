$(document).ready(function() {
  $("#tweet-text").on('keydown', function () {
    const remain = 140 - this.value.length    
    let characterCounter = document.getElementById('counter')
    characterCounter.textContent = remain
    if (remain >= 0) {
      characterCounter.style.color = "black";
    } else {
      characterCounter.style.color = "red";
    }
  })
});



