
webpackJsonp([0], {

    /***/ 84:
    /***/ (function (module, exports, __webpack_require__) {

            "use strict";


            console.log('Welcome To The Rocky Stack');

            /***/
        })

}, [84]);


// set up selections
var gameState = {
    userPokemon: "",
    rivalPokemon: "",
    pokemonDB: [
        {
            name: 'Charmander',
            type: 'fire',
            hp: 39,
            attack: 52,
            defense: 43,
            level: 1,
            img: "http://www.smogon.com/dex/media/sprites/xy/charmander.gif"
        }, {
            name: 'Bulbasaur',
            type: 'grass',
            hp: 45,
            attack: 49,
            defense: 49,
            level: 1,
            img: "http://www.smogon.com/dex/media/sprites/xy/bulbasaur.gif"
        }, {
            name: 'Squirtle',
            type: 'water',
            hp: 44,
            attack: 48,
            defense: 65,
            level: 1,
            img: "http://www.smogon.com/dex/media/sprites/xy/squirtle.gif"
        },
    ],
    elements: {
        pokemonsEl: document.querySelector(".select-screen").querySelectorAll(".character"),
        battleScreenEl: document.getElementById("battle-screen"),
        attackBtnsEl: document.getElementById("battle-screen").querySelectorAll(".attack")

    },

    init: function () {
        // selecting your pokemon (Initial Loop)
        var i = 0;
        while (i < gameState.elements.pokemonsEl.length) {
            // Add Function to All Characters on Screen Select
            gameState.elements.pokemonsEl[i].onclick = function () {
                // Current Selected Pokemons Name
                var pokeName = this.querySelector(".title").textContent;
                // Elements for Images on Battle Screen
                var player1Img = document.querySelector(".player1").getElementsByTagName("img");
                var player2Img = document.querySelector(".player2").getElementsByTagName("img");
                
                // Save Current Pokemone
                gameState.userPokemon = pokeName;
                // CPU Picks Pokemon
                gameState.cpuPick();
                // console.log(gameState);
                // Change Screen to Battle Screen
                gameState.elements.battleScreenEl.classList.toggle("active");
                // Select Data from Current User Pokemon
                gameState.currentPokemon = gameState.pokemonDB.filter(function (pokemon) {
                    return pokemon.name == gameState.userPokemon;
                });
                player1Img[0].src = gameState.currentPokemon[0].img;
                // Select Data from Current CPU Pokemon
                gameState.currentRivalPokemon = gameState.pokemonDB.filter(function (pokemon) {
                    return pokemon.name == gameState.rivalPokemon;
                });
                player2Img[0].src = gameState.currentRivalPokemon[0].img;

                gameState.currentPokemon[0].health = gameState.calculateInitialHealth(gameState.currentPokemon)
                gameState.currentPokemon[0].originalHealth = gameState.calculateInitialHealth(gameState.currentPokemon)
                gameState.currentRivalPokemon[0].health = gameState.calculateInitialHealth(gameState.currentRivalPokemon)
                gameState.currentPokemon[0].originalHealth = gameState.calculateInitialHealth(gameState.currentRivalPokemon)
                // User Choose Attack

                // CPU Health Drop

                // CPU Attack

                // User Health Drop

                // Rock > Scissors

                // Scissors > Paper

                // Paper > Rock

                // Depending on Pokemon Type/Defence, Depends on Damage

                // Health with <= 0 Loses
            };
            i++;
        }

        // Select Attack
        var a = 0;
        while (a < gameState.elements.attackBtnsEl.length) {
            gameState.elements.attackBtnsEl[a].onclick = function () {
                var attackName = this.dataset.attack;
                gameState.currentUserAttack = attackName;
                // console.log(gameState.currentUserAttack);
                gameState.play(attackName, gameState.cpuAttack());
            };
            a++;
        }

    },
    cpuAttack: function () {
        var attacks = ["rock", "paper", "scissors"];

        return attacks[gameState.randomNumber(0, 3)];
    },

    calculateInitialHealth: function (user) {
        return ((0.20 * Math.sqrt(user[0].level)) * user[0].defense) * user[0].hp
    },

    attackMove: function (attack, level, stack, critical, enemy, attacker) {
        console.log("enemy.health before: " + enemy.health)
        var attackAmount = ((attack * level) * (stack + critical))
        enemy.health = enemy.health - attackAmount
        var userHP = document.querySelector('.player1').querySelector('.stats').querySelector('.health').querySelector('.health-bar').querySelector('.inside')
        var cpuHP = document.querySelector('.player2').querySelector('.stats').querySelector('.health').querySelector('.health-bar').querySelector('.inside')
        if(enemy.owner == 'user'){
           var minusPercent = ((enemy.health * 100) / enemy.originalHealth)
           userHP.style.width = ((minusPercent < 0) ? 0 : minusPercent) + '%'
        }else{
            var minusPercent = ((enemy.health * 100) / attacker.originalHealth)
        cpuHP.style.width = ((minusPercent < 0) ? 0 : minusPercent) + '%'
        }
        gameState.checkWinner(enemy, attacker)
        console.log(enemy.health)
    },

    checkWinner: function (enemy, attacker) {
        if (enemy.health <= 0) {
            console.log('Hey winner winner, vegan chicken dinner ' + attacker.name)
            document.querySelector('.fight-btn').innerHTML = 'Winner: ' + attacker.name + '!'
        }

    },


    // picks a number at random between min/max
    randomNumber: function (min, max) {
        return Math.floor(Math.random() * (max - min)) + min;
    },
    // adds the picked selection into (=) rivalPokemon
    cpuPick: function() {
       do{
        gameState.rivalPokemon = gameState.elements.pokemonsEl[gameState.randomNumber(0, 3)].querySelector(".title").textContent;
       }
       while(gameState.userPokemon == gameState.rivalPokemon)
        
    },

    play: function (userAttack, cpuAttack) {
        var currentPokemon = gameState.currentPokemon[0];
        var currentRivalPokemon = gameState.currentRivalPokemon[0];
        currentPokemon.owner = 'user'
        currentRivalPokemon.owner = 'cpu'
        switch (userAttack) {
            case 'rock':
                // console.log(userAttack)
                if (cpuAttack == 'paper') {
                    if (currentPokemon.health >= 1 && currentRivalPokemon.health >= 1) {
                        gameState.attackMove(currentPokemon.attack,
                            currentPokemon.level,
                            .8,
                            .5,
                            currentRivalPokemon, currentPokemon)
                        if (currentRivalPokemon.health >= 1) {
                            //cpu
                            gameState.attackMove(currentRivalPokemon.attack,
                                currentRivalPokemon.level,
                                .8,
                                2,
                                currentPokemon, currentRivalPokemon)
                            console.log("Paper Beats Rock!");
                        }
                    }
                }
                if (cpuAttack == 'scissors') {
                    if (currentPokemon.health >= 1 && currentRivalPokemon.health >= 1) {
                        gameState.attackMove(currentPokemon.attack,
                            currentPokemon.level,
                            .8,
                            .5,
                            currentRivalPokemon, currentPokemon)
                        if (currentRivalPokemon.health >= 1) {
                            //cpu
                            gameState.attackMove(currentRivalPokemon.attack,
                                currentRivalPokemon.level,
                                .8,
                                2,
                                currentPokemon, currentRivalPokemon)
                            console.log("Rock Beats Scissors!");
                        }
                    }
                }
                if (cpuAttack == 'rock') {
                    if (currentPokemon.health >= 1 && currentRivalPokemon.health >= 1) {
                        gameState.attackMove(currentPokemon.attack,
                            currentPokemon.level,
                            .8,
                            1,
                            currentRivalPokemon, currentPokemon)
                        if (currentRivalPokemon.health >= 1) {
                            //cpu
                            gameState.attackMove(currentRivalPokemon.attack,
                                currentRivalPokemon.level,
                                .8,
                                1,
                                currentPokemon, currentRivalPokemon)
                            console.log("Tie!");
                        }
                    }
                }
                break;
            case 'paper':
                if (cpuAttack == 'paper') {
                    if (currentPokemon.health >= 1 && currentRivalPokemon.health >= 1) {
                        gameState.attackMove(currentPokemon.attack,
                            currentPokemon.level,
                            .8,
                            1,
                            currentRivalPokemon, currentPokemon)
                        if (currentRivalPokemon.health >= 1) {
                            //cpu
                            gameState.attackMove(currentRivalPokemon.attack,
                                currentRivalPokemon.level,
                                .8,
                                1,
                                currentPokemon, currentRivalPokemon)
                            console.log("Paper Beats Rock!");
                        }
                    }
                }
                if (cpuAttack == 'scissors') {
                    if (currentPokemon.health >= 1 && currentRivalPokemon.health >= 1) {
                        gameState.attackMove(currentPokemon.attack,
                            currentPokemon.level,
                            .8,
                            .5,
                            currentRivalPokemon, currentPokemon)
                        if (currentRivalPokemon.health >= 1) {
                            //cpu
                            gameState.attackMove(currentRivalPokemon.attack,
                                currentRivalPokemon.level,
                                .8,
                                2,
                                currentPokemon, currentRivalPokemon)
                            console.log("Rock Beats Scissors!");
                        }
                    }
                }
                if (cpuAttack == 'rock') {
                    if (currentPokemon.health >= 1 && currentRivalPokemon.health >= 1) {
                        gameState.attackMove(currentPokemon.attack,
                            currentPokemon.level,
                            .8,
                            2,
                            currentRivalPokemon, currentPokemon)
                        if (currentRivalPokemon.health >= 1) {
                            //cpu
                            gameState.attackMove(currentRivalPokemon.attack,
                                currentRivalPokemon.level,
                                .8,
                                .5,
                                currentPokemon, currentRivalPokemon)
                            console.log("Tie!");
                            // console.log(userAttack)
                        }
                    }
                }
                break;
            case 'scissors':
                if (cpuAttack == 'paper') {
                    if (currentPokemon.health >= 1 && currentRivalPokemon.health >= 1) {
                        gameState.attackMove(currentPokemon.attack,
                            currentPokemon.level,
                            .8,
                            2,
                            currentRivalPokemon, currentPokemon)
                        if (currentRivalPokemon.health >= 1) {
                            //cpu
                            gameState.attackMove(currentRivalPokemon.attack,
                                currentRivalPokemon.level,
                                .8,
                                .5,
                                currentPokemon, currentRivalPokemon)
                            console.log("Paper Beats Rock!");
                        }
                    }
                }
                if (cpuAttack == 'scissors') {
                    if (currentPokemon.health >= 1 && currentRivalPokemon.health >= 1) {
                        gameState.attackMove(currentPokemon.attack,
                            currentPokemon.level,
                            .8,
                            1,
                            currentRivalPokemon, currentPokemon)
                        if (currentRivalPokemon.health >= 1) {
                            //cpu
                            gameState.attackMove(currentRivalPokemon.attack,
                                currentRivalPokemon.level,
                                .8,
                                1,
                                currentPokemon, currentRivalPokemon)
                            console.log("Rock Beats Scissors!");
                        }
                    }
                }
                if (cpuAttack == 'rock') {
                    if (currentPokemon.health >= 1 && currentRivalPokemon.health >= 1) {
                        gameState.attackMove(currentPokemon.attack,
                            currentPokemon.level,
                            .8,
                            .5,
                            currentRivalPokemon, currentPokemon)
                        if (currentRivalPokemon.health >= 1) {
                            //cpu
                            gameState.attackMove(currentRivalPokemon.attack,
                                currentRivalPokemon.level,
                                .8,
                                2,
                                currentPokemon, currentRivalPokemon)
                            console.log("Tie!");
                        }
                    }
                }
                break;
        }
    }

};

gameState.init();




