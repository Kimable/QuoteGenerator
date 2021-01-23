const quoteContainer = document.getElementById("quote-container");
const quoteText = document.getElementById("quote");
const authorText = document.getElementById("author");
const newQuoteBtn = document.getElementById("new-quote");
const twitterBtn = document.getElementById("twitter");
const loader = document.getElementById("loader");

// show Loader
function loading() {
  loader.hidden = false;
  quoteContainer.hidden = true;
}

// Hide loader
function complete() {
  if (!loader.hidden) {
    quoteContainer.hidden = false;
    loader.hidden = true;
  }
}

// Get quote from API
async function getQuote() {
  // Start Loader
  loading();
  //   const proxy = "https://cors-anywhere.herokuapp.com/";
  const appUrl = "https://api.quotable.io/random";

  try {
    const response = await fetch(appUrl);
    const data = await response.json();

    if (data.author === "") {
      authorText.innerText = "Unkown";
    } else {
      authorText.innerText = data.author;
    }
    //  Reduce font for text
    if (data.content.length > 120) {
      quoteText.classList.add("long-quote");
    } else {
      quoteText.classList.remove("long-quote");
    }
    quoteText.innerText = data.content;
    // Stop loader, Show quote
    complete();
  } catch (error) {
    // getQuote();
    console.log("Woops, no quote there!", error);
  }
}

// Tweet quote functionality
function tweetQuote() {
  const quote = quoteText.innerText;
  const author = authorText.innerText;
  const twitterUrl = `https://twitter.com/intent/tweet?text=${quote} - ${author}`;

  window.open(twitterUrl, "_blank");
}

// Event Listners
newQuoteBtn.addEventListener("click", getQuote);
twitterBtn.addEventListener("click", tweetQuote);
// On Load
getQuote();
