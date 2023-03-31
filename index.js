const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterButton = document.getElementById('twitter');
const newButtonQuote = document.getElementById('new-quote');
const loader = document.getElementById('loader');

let apiQuotes = [];

// Show Loading
function loading () {
    loader.hidden = false;
    quoteContainer.hidden = true;
}

// Hide Loading
function completed () {
    loader.hidden = true;
    quoteContainer.hidden = false;
}



// Get quotes from API
async function getQuotes () {
    loading();
    const apiurl = 'https://type.fit/api/quotes';

    // Fetching the data
    fetch(apiurl)
    .then (response => response.json())

    //Show new quotes
    .then (apiQuotes => {
        const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)]; 

        // CHeck if the author feild is blank replace it with unknown
        if (!quote.author) {
            authorText.textContent = "Unknown";
        } else {
            authorText.textContent = quote.author;
        }

        //Checking the quote length to determine the styling 
        if (quote.text.length > 50) {
            quoteText.classList.add('long-quote');
        } else {
            quoteText.classList.remove('long-quote');
        }
        // Set quote and hide loader
        quoteText.textContent = quote.text;
        completed();
    })
    .catch (error => {
        console.log(error);
    });
}

// Tweet Quotes 
function tweetQuote () {
    // Question mark indicates query parameter
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
    //Allow us to open a new window using a twitter url
    window.open(twitterUrl, '_blank');
}

// Event Listeners 
newButtonQuote.addEventListener('click', getQuotes);
twitterButton.addEventListener('click', tweetQuote);


//On Load
getQuotes();
