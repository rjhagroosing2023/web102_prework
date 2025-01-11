/*****************************************************************************
 * Challenge 2: Review the provided code. The provided code includes:
 * -> Statements that import data from games.js
 * -> A function that deletes all child elements from a parent element in the DOM
*/

// import the JSON data about the crowd funded games from the games.js file
import GAMES_DATA from './games.js';

// create a list of objects to store the data about the games using JSON.parse
const GAMES_JSON = JSON.parse(GAMES_DATA)

console.log(GAMES_JSON.length);

// remove all child elements from a parent element in the DOM
function deleteChildElements(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

/*****************************************************************************
 * Challenge 3: Add data about each game as a card to the games-container
 * Skills used: DOM manipulation, for loops, template literals, functions
*/

// grab the element with the id games-container
const gamesContainer = document.getElementById("games-container");

// create a function that adds all data from the games array to the page
function addGamesToPage(games) {
    // loop over each item in the data
    for (let i = 0; i < games.length; i++) {
        // Create a new div element
        let gameCard = document.createElement("div");

        // Add the class 'game-card' to the div
        gameCard.classList.add("game-card");

        // Set the inner HTML of the div using a template literal
        gameCard.innerHTML = `
            <img src="${games[i].imageUrl}" alt="${games[i].title}" class="game-img">
            <h3>${games[i].title}</h3>
            <p>${games[i].description}</p>
            <!-- Add more attributes as needed -->
        `;

        // Append the game card to a parent element in your DOM
        // For example: gamesContainer.appendChild(gameCard);
    }
}




   


        // set the inner HTML using a template literal to display some info 
        // about each game
        // TIP: if your images are not displaying, make sure there is space
        // between the end of the src attribute and the end of the tag ("/>")


        // append the game to the games-container



// call the function we just defined using the correct variable
// later, we'll call this function using a different list of games


/*************************************************************************************
 * Challenge 4: Create the summary statistics at the top of the page displaying the
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: arrow functions, reduce, template literals
*/

// grab the contributions card element
const contributionsCard = document.getElementById("num-contributions");

// use reduce() to count the number of total contributions by summing the backers
const totalContributions = GAMES_JSON.reduce((total, game) => {
    return total + game.backers; // Assuming 'backers' is the attribute for individual contributions
}, 0);

console.log("totalContributions", totalContributions.toLocaleString('en-US'));


// set the inner HTML using a template literal and toLocaleString to get a number with commas
contributionsCard.innerHTML=totalContributions.toLocaleString('en-US')


// grab the amount raised card, then use reduce() to find the total amount raised
const raisedCard = document.getElementById("total-raised");
const totalRaised = GAMES_JSON.reduce((total, game) => {
    return total + game.pledged; // Assuming 'backers' is the attribute for individual contributions
}, 0);

// set inner HTML using template literal
raisedCard.innerHTML=totalRaised.toLocaleString('en-US')

// grab number of games card and set its inner HTML
const gamesCard = document.getElementById("num-games");

const totalNumberOfGames = GAMES_JSON.length; // Calculate the total number of games

gamesCard.textContent = totalNumberOfGames; // Display the total number of games in the gamesCard element



/*************************************************************************************
 * Challenge 5: Add functions to filter the funded and unfunded games
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: functions, filter
*/

// show only games that do not yet have enough funding
function filterUnfundedOnly() {
    deleteChildElements(gamesContainer);

          
        // Use filter() to get a list of games that have not yet met their goal
        const unfundedGames = GAMES_JSON.filter(game => game.pledged < game.goal);
    
        // Use the function we previously created to add the unfunded games to the DOM
        addGamesToPage(unfundedGames);
    
        // Use console.log to see the number of games in the array
        console.log(unfundedGames.length);
    }
    
    // Call the function to execute
    filterUnfundedOnly();
    

    // use the function we previously created to add the unfunded games to the DOM



// show only games that are fully funded
function filterFundedOnly() {
    deleteChildElements(gamesContainer);

    // Use filter() to get a list of games that have met or exceeded their goal
    const fundedGames = GAMES_JSON.filter(game => game.pledged >= game.goal);

    // Use the function we previously created to add the funded games to the DOM
    addGamesToPage(fundedGames);

    // Use console.log to see the number of games in the array
    console.log(fundedGames.length);
}

// Call the function to execute
filterFundedOnly();

    // use filter() to get a list of games that have met or exceeded their goal


    // use the function we previously created to add unfunded games to the DOM



// show all games
function showAllGames() {
    deleteChildElements(gamesContainer);

    // add all games from the JSON data to the DOM

}

// select each button in the "Our Games" section
const unfundedBtn = document.getElementById("unfunded-btn");
const fundedBtn = document.getElementById("funded-btn");
const allBtn = document.getElementById("all-btn");

// add event listeners with the correct functions to each button


/*************************************************************************************
 * Challenge 6: Add more information at the top of the page about the company.
 * Skills used: template literals, ternary operator
*/

// grab the description container
const descriptionContainer = document.getElementById("description-container");

// use filter or reduce to count the number of unfunded games
const unfundedGamesCount = GAMES_JSON.filter(game => game.pledged < game.goal).length;


// create a string that explains the number of unfunded games using the ternary operator
const totalPledged = GAMES_JSON.reduce((total, game) => total + game.pledged, 0);
const totalGames = GAMES_JSON.length;


const unfundedGamesStatement = `${totalPledged.toLocaleString()} has been raised across ${totalGames} games. Currently, there ${unfundedGamesCount === 1 ? 'is' : 'are'} ${unfundedGamesCount} game${unfundedGamesCount === 1 ? '' : 's'} that remain${unfundedGamesCount === 1 ? 's' : ''} unfunded.`;

console.log(unfundedGamesStatement);


// create a new DOM element containing the template string and append it to the description container





// Create new paragraph element
const paragraph = document.createElement("p");
paragraph.textContent = unfundedGamesStatement;

// Append the paragraph to the descriptionContainer

descriptionContainer.appendChild(paragraph);

/************************************************************************************
 * Challenge 7: Select & display the top 2 games
 * Skills used: spread operator, destructuring, template literals, sort 
 */

const firstGameContainer = document.getElementById("first-game");
const secondGameContainer = document.getElementById("second-game");

const sortedGames =  GAMES_JSON.sort( (item1, item2) => {
    return item2.pledged - item1.pledged;
});

// use destructuring and the spread operator to grab the first and second games
// Assuming sortedGames is sorted
if (sortedGames.length >= 2) {
    const [mostFundedGame, secondMostFundedGame] = sortedGames;
    console.log("Most funded game object:", mostFundedGame);
    console.log("Second most funded game object:", secondMostFundedGame);

    const firstWordOfMostFundedGame = mostFundedGame.title ? mostFundedGame.title.split(' ')[0] : 'Untitled';
    const firstWordOfSecondMostFundedGame = secondMostFundedGame.title ? secondMostFundedGame.title.split(' ')[0] : 'Untitled';

    console.log("First word of the most funded game:", firstWordOfMostFundedGame);
    console.log("First word of the second most funded game:", firstWordOfSecondMostFundedGame);
} else {
    console.log("Not enough games in the list to determine the top two funded games.");
}



// create a new element to hold the name of the top pledge game, then append it to the correct element

// do the same for the runner up item