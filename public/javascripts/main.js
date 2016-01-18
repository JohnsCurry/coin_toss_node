$(document).ready(function(){

  $.preloadImages = function(){
    for (var i = 0; i < arguments.length; i++) {
      $("<img />").attr("src", arguments[i]);
    }
  }

  $.preloadImages("http://www.goldcoinhistory.com/wp-content/uploads/2012/05/GP_US_1850_C_Liberty_Head_One_Dollar_Type_I_obverse.jpeg", "http://www.goldcoinhistory.com/wp-content/uploads/2012/05/GP_US_1850_C_Liberty_Head_One_Dollar_Type_I_reverse.jpeg");


  var coinSides = ['heads', 'tails'];
  var bet;
  var sideChosen;
  var flipValue;
  var wallet = 500;
  //User must enter a valid bet in order to access the "heads" and "tails" button.
  $( "#playAgain" ).prop('disabled', true);
  $( "#flipCoin" ).prop('disabled', true);
  $( "#heads" ).prop('disabled', true);
  $( "#tails" ).prop('disabled', true);
  $( "#endGame" ).prop('disabled', true);

  //setting the heading so I can change it depending on how much the user has in the wallet.
  var myHeading = document.querySelector('h1');
  
  myHeading.textContent = "Welcome to Coin Toss! You have $" + wallet;
  
  var gameInstructions = document.querySelector('h3');
  
  //This is where the current instructions are. this changes repeatedly.
  gameInstructions.textContent = "Place a bet!";


//If user clicks the placebet button..
  $( "#placeBet" ).click(function() {
    //set bet variable to the number put in the text field
    bet = $( "#inputQuery" ).val();
    //validating input
    bet = parseInt(bet, 10);
    if (bet <= wallet && bet !== 0 && bet > 0 ){
      //If bet is valid, allow user to choose heads/tails and disallow placing another bet
      $( "#heads" ).prop('disabled', false);
      $( "#tails" ).prop('disabled', false);
      $( "#placeBet").prop('disabled', true);
      //update instructions so user knows what to do.
      gameInstructions.textContent = "Heads or Tails?";
    } else {
      //Input was not entered correctly, try again
      gameInstructions.textContent = "Enter Valid Input Please";
    }
  });

// I originally wanted to set the sideChosen variable and use a control structure to process the
// win/loss, and bet amount, but I'm not sure the best way to do this when a button click is involved.

  $( "#heads" ).click(function() {
    sideChosen = "heads";
    $(gameInstructions).html("You chose Heads!!");
    //disable heads/tails buttons, allow user to flip coin.
    $( "#heads" ).prop('disabled', true);
    $( "#tails" ).prop('disabled', true);
    $( "#flipCoin").prop('disabled', false);
  });

  $( "#tails" ).click(function() {
    sideChosen = "tails";
    //same stuff as if user chose heads.
    $(gameInstructions).html("You chose Tails!!");
    $( "#heads" ).prop('disabled', true);
    $( "#tails" ).prop('disabled', true);
    $( "#flipCoin").prop('disabled', false);
  });

// I originally wanted the coin to flip automatically after chosing heads/tails, but for some reason it was
// more difficult than I anticipated, and I just went with this...

  $( "#flipCoin" ).click(function(){
    // disable flip coin button since I already flipped
    $( "#flipCoin").prop('disabled', true);
    flipValue = coinSides[Math.floor(Math.random() * coinSides.length)];
    if (flipValue === "heads"){
      $(".image").html('<img class="heads" src="http://www.goldcoinhistory.com/wp-content/uploads/2012/05/GP_US_1850_C_Liberty_Head_One_Dollar_Type_I_obverse.jpeg"/>');
      $('.heads').addClass('animated flip');
    } else {
      $(".image").html('<img class="tails" src="http://www.goldcoinhistory.com/wp-content/uploads/2012/05/GP_US_1850_C_Liberty_Head_One_Dollar_Type_I_reverse.jpeg"/>');
      $('.tails').addClass('animated flip');
    }
    if (flipValue === sideChosen) {
      //win and offer to play again
      $(gameInstructions).html("Coin Landed on " + flipValue + " You WIN $" + bet + "! Play again?");
      //update wallet
      wallet += parseInt(bet, 10);
      //update h1 to have an accurate wallet balance
      myHeading.textContent = "Welcome to Coin Toss! You have $" + wallet;
      //allow user to play again.
      $( "#playAgain" ).prop('disabled', false);
      $( "#endGame" ).prop('disabled', false);
    } else {
      //lose situation
      $(gameInstructions).html("Coin Landed on " + flipValue + " You Lose $" + bet + "! Play again?");
      wallet -= parseInt(bet, 10);
      myHeading.textContent = "Welcome to Coin Toss! You have $" + wallet;
      //disable all buttons if users wallet gets to zero.
      if( wallet <= 0){
        $(gameInstructions).html("GAME OVER!");
      } else {
        $( "#playAgain" ).prop('disabled', false);
        $( "#endGame" ).prop('disabled', false);
      }
    }
  });
//Reset everything so user can play again
  $( "#playAgain" ).click(function(){
    $( "#playAgain" ).prop('disabled', true);
    $( "#flipCoin" ).prop('disabled', true);
    $( "#placeBet").prop('disabled', false)
    $( "#endGame" ).prop('disabled', true);
    $(gameInstructions).html("Place a bet!");
  });

  // End game
  $( "#endGame").click(function(){
    $(gameInstructions).html("Your final score is: " + wallet);
    $( "#playAgain").prop('disabled', true);
    $( "#endGame").prop('disabled', true);
    var parameters = {score: wallet};
    $.post( '/addScore', parameters, function(data){
      $(gameInstructions).append(" Your score was added to the Database");
    });
  });


});