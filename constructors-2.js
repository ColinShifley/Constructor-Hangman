var inquirer = require("inquirer");

function Letter(letter) {

  this._letter = letter

}

Letter.prototype.isMatch = function(letterToMatch) {

  return this._letter === letterToMatch

}


function Word(word) {

  this._word = [];
  this._shadowWord = [];
  

  for(let i = 0; i < word.length; i++) {

    this._word.push(new Letter(word[i].toLowerCase()))
    this._shadowWord.push("_")

  }
}

Word.prototype.getWord = function() {
  return this._word.map(letterObject => {
    return letterObject._letter;
  })
}

Word.prototype.finish = function() {
  
  shadowWordMatchesInitialWord = this.getWord().join("") === this._shadowWord.join("")
  //console.log('matching words (shadow vs. real) ', this._shadowWord.join(""), this.getWord().join(""));
  return shadowWordMatchesInitialWord

}
   

Word.prototype.checkGuess = function(letterToGuess) {

  const testLetter = letterToGuess/*.prototype.toLowerCase()*/

  let thereWasAMatch = false;

  for(let i = 0; i < this._word.length; i++) {

    if(this._word[i].isMatch(testLetter)) {

      thereWasAMatch = true;

      this._shadowWord[i] = testLetter;

    }

  }

  return thereWasAMatch;
  
}




// Game function should:
//  • Take in user input
//  • Keep track of guesses
//  • Ask for new word
//  • Display blanks (._shadowWord) - Then switch letters out
//  • Check user input (.checkGuess) - if correct replace ._shadowWord, if wrong display incorrect and show how many guesses left.
//  • Increase word increment through word array list once word is guessed correct - i++
//  • Show how many chances left


function Game(word) {

  var wordToGuess = new Word(word);
  console.log(wordToGuess._shadowWord.join(" "));

    var guesses = 12;

  
    
    test();
    
    function reset() {
      guesses = 12,
      Game(),
      index++
    }

    function end() {
      process.exit(0)
    }
     

    function test() {
    
    //add inquirer prompt here:
      inquirer.prompt([
        {
        name: "Letter",
        message: "Please Guess a letter"
        }
      ]).then(answers => {
        // fill in letter in shadow word
        if(wordToGuess.checkGuess(answers.Letter) === false) {
          guesses--;
          console.log("Guesses Remaining: " + guesses)          
        }
        // displaying the word
        console.log(wordToGuess._shadowWord.join(" "))

        if(guesses === 0) {
          console.log('Game Over - no more guesses')
        }
        if(wordToGuess.finish() === true) {
          console.log('Great! You\'ve guessed the word')
          inquirer.prompt([{
            name: "playmore",
            message: "Would you like to play again? y/n"
          }]).then(answers => {
          if(answers.playmore === "y"){
            reset()
          }
          if(answers.playmore === "n"){
            end()
          }
        });
        } else {
          test()          
        }
        
      });
    }
}



   //assign word
    

    // var wordy = ["stuff", "things"];
    // for(i=0; i<wordy.length; i++ ) {
        
    //     var words = new Word(wordy[i])
    //     guesses = wordy.length
    // }

    
   // return word

/*
//function input(function(x) {
   word = game()
   userInput = 'x'
   Word.checkGuess(userInput)
   if(word.wordGuessed()) {
      console.log('Congratulations'),
      Game()
   } else {
    console.log(word._shadowWord);
   }

})*/


var arr = ["stuff", "things", "cannon"]
var index = Math.floor(Math.random() * arr.length);

let game = Game(arr[index]);
//console.log("index: " + index)


// var userInput = process.argv[3];

// const userGuess = userInput;

//const word = new Word("Board")

//console.log(word._shadowWord);

//word.checkGuess(userGuess)

//console.log(word._shadowWord);


/*
letter = new Letter('k');
console.log(JSON.stringify(letter, null, 2))

console.log(letter.isMatch('n'));
console.log(letter.isMatch('k'));
*/
