window.onload = function () {

    var alphabet = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h',
        'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's',
        't', 'u', 'v', 'w', 'x', 'y', 'z'];

    var categories = [
        ['ellison'],
        ['reese'],
        ["jackson"],
    ];         // Array of topics
    var categoryMessages = [
        ["Guess last name"],
        ["Guess middle name"],
        ["Guess first name"]
    ];
    var hints = [
        ["Please!!!! YOU WISH!!!"],
        ["Please!!!! YOU WISH!!!"],
        ["Please!!!! YOU WISH!!!"]
    ];

    var chosenCategory;     // Selected catagory
    var getHint;          // Word getHint
    var word;              // Selected word
    var guess;             // Geuss
    var geusses = [];      // Stored geusses
    var lives;             // Lives
    var counter;           // Count correct geusses
    var space;              // Number of spaces in word '-'

    // Get elements
    var showLives = document.getElementById("mylives");
    var showCatagory = document.getElementById("scatagory");
    var getHint = document.getElementById("hint");
    var showClue = document.getElementById("clue");



    // create alphabet ul
    var buttons = function () {
        myButtons = document.getElementById('buttons');
        letters = document.createElement('ul');

        for (var i = 0; i < alphabet.length; i++) {
            letters.id = 'alphabet';
            list = document.createElement('li');
            list.id = 'letter';
            list.innerHTML = alphabet[i];
            check();
            myButtons.appendChild(letters);
            letters.appendChild(list);
        }
    }


    // Select Catagory
    var selectCat = function () {
        catagoryName.innerHTML = categoryMessages[nextCategory];
        // if (chosenCategory === categories[0]) {
        //     catagoryName.innerHTML = "The Chosen Category Is First Name";
        // } else if (chosenCategory === categories[1]) {
        //     catagoryName.innerHTML = "The Chosen Category Is Last Name";
        // }
    }

    // Create geusses ul
    result = function () {
        wordHolder = document.getElementById('hold');
        correct = document.createElement('ul');

        for (var i = 0; i < word.length; i++) {
            correct.setAttribute('id', 'my-word');
            guess = document.createElement('li');
            guess.setAttribute('class', 'guess');
            if (word[i] === "-") {
                guess.innerHTML = "-";
                space = 1;
            } else {
                guess.innerHTML = "_";
            }

            geusses.push(guess);
            wordHolder.appendChild(correct);
            correct.appendChild(guess);
        }
    }

    // Show lives
    comments = function () {
        showLives.innerHTML = "You have " + lives + " lives";
        if (lives < 1) {
            //showLives.innerHTML = "Wow. Game Over. You killed that poor little man.";
            document.getElementById('game').classList.add('hideme');
            document.getElementById('gameover').classList.add('active');

        }
        for (var i = 0; i < geusses.length; i++) {
            if (counter + space === geusses.length) {
                showLives.innerHTML = "You Win!";
            }
        }
    }

    // Animate man
    var animate = function () {
        var drawMe = lives;
        var drawNextPart = drawArray[drawMe];
        console.log('test', typeof drawNextPart)
        if (typeof drawNextPart == 'object') {
            for (let ii = 0; ii <= drawNextPart.length - 1; ii++) {
                drawNextPart[ii]();
            };
        }
        else {
            drawNextPart();
        }
    }


    // Hangman
    canvas = function () {

        myStickman = document.getElementById("stickman");
        context = myStickman.getContext('2d');
        context.beginPath();
        context.strokeStyle = "#fff";
        context.lineWidth = 2;
    };

    head = function () {
        myStickman = document.getElementById("stickman");
        context = myStickman.getContext('2d');
        context.beginPath();
        context.arc(60, 25, 10, 0, Math.PI * 2, true);
        context.stroke();
    }

    draw = function ($pathFromx, $pathFromy, $pathTox, $pathToy) {

        context.moveTo($pathFromx, $pathFromy);
        context.lineTo($pathTox, $pathToy);
        context.stroke();
    }

    //#region frames

    frame1 = function () {
        draw(0, 150, 150, 150);
    };

    frame2 = function () {
        draw(10, 0, 10, 600);
    };

    frame3 = function () {
        draw(0, 5, 70, 5);
    };

    frame4 = function () {
        draw(60, 5, 60, 15);
    };

    torso = function () {
        draw(60, 36, 60, 70);
    };

    rightArm = function () {
        draw(60, 46, 100, 50);
    };

    leftArm = function () {
        draw(60, 46, 20, 50);
    };

    rightLeg = function () {
        draw(60, 70, 100, 100);
    };

    leftLeg = function () {
        draw(60, 70, 20, 100);
    };
    //#endregion


    drawArray = [[rightLeg, leftLeg, rightArm], [leftArm, torso, head], [frame4, frame3, frame2, frame1]];


    // OnClick Function
    check = function () {
        list.onclick = function () {
            var geuss = (this.innerHTML);
            this.setAttribute("class", "active");
            this.onclick = null;
            for (var i = 0; i < word.length; i++) {
                if (word[i] === geuss) {
                    geusses[i].innerHTML = geuss;
                    counter += 1;
                }
            }
            var j = (word.indexOf(geuss));
            if (j === -1) {
                lives -= 1;
                comments();
                animate();
            } else {
                comments();
            }
        }
    }


    // Play
    let nextCategory = 0;
    play = function () {
        //chosenCategory = categories[Math.floor(Math.random() * categories.length)];
        chosenCategory = categories[nextCategory];
        word = chosenCategory[0];
        word = word.replace(/\s/g, "-");
        console.log(word);
        buttons();

        geusses = [];
        lives = 3;
        counter = 0;
        space = 0;
        result();
        comments();
        selectCat();
        canvas();
        nextCategory++;
    }

    play();

    // Hint

    hint.onclick = function () {


        var catagoryIndex = categories.indexOf(chosenCategory);
        var hintIndex = chosenCategory.indexOf(word);
        document.getElementById('clue').classList.add('active');
        showClue.innerHTML = "Clue: - " + hints[catagoryIndex][0];
    };

    // Reset

    document.getElementById('reset').onclick = function () {
        if (showLives.innerHTML == "You Win!") {
            correct.parentNode.removeChild(correct);
            letters.parentNode.removeChild(letters);
            showClue.innerHTML = "";
            context.clearRect(0, 0, 400, 400);
            play();
        } else {
            alert('ahh please. you need to win the first one');
        }
    }
}


