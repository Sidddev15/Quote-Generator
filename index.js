const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterButton = document.getElementById('twitter');
const newButtonQuote = document.getElementById('new-quote');
const loader = document.getElementById('loader');

const RAPIDAPI_KEY = 'YOUR_RAPIDAPI_KEY'; // Replace with your actual RapidAPI key

// Show Loading
function loading() {
    loader.hidden = false;
    quoteContainer.hidden = true;
    newButtonQuote.disabled = true;
}

// Hide Loading
function completed() {
    loader.hidden = true;
    quoteContainer.hidden = false;
    newButtonQuote.disabled = false;
}

// Get quotes from API
async function getQuotes() {
    loading();
    const apiurl = 'https://andruxnet-random-famous-quotes.p.rapidapi.com/?count=10&cat=movies';
    
    try {
        const response = await fetch(apiurl, {
            method: 'GET',
            headers: {
                'x-rapidapi-key': RAPIDAPI_KEY,
                'x-rapidapi-host': 'andruxnet-random-famous-quotes.p.rapidapi.com',
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const apiQuotes = await response.json();

        if (!Array.isArray(apiQuotes) || apiQuotes.length === 0) {
            throw new Error('No quotes found.');
        }

        const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];

        authorText.textContent = quote.author || "Unknown";

        if (quote.text.length > 50) {
            quoteText.classList.add('long-quote');
        } else {
            quoteText.classList.remove('long-quote');
        }

        quoteText.textContent = quote.text;

        completed();
    } catch (error) {
        console.error('Error fetching quotes:', error);
        quoteText.textContent = "Failed to fetch quotes. Please try again later.";
        authorText.textContent = "";
        completed();
    }
}

// Tweet Quotes 
function tweetQuote() {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(quoteText.textContent)} - ${encodeURIComponent(authorText.textContent)}`;
    window.open(twitterUrl, '_blank');
}

// Event Listeners 
newButtonQuote.addEventListener('click', getQuotes);
twitterButton.addEventListener('click', tweetQuote);

// On Load
getQuotes();
