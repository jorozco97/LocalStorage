/** Variables */
const formulario = document.querySelector('#formulario');
const listaTweets = document.querySelector('#lista-tweets');
let tweets = [];


/** Eventos */
eventos();

function eventos() {

    formulario.addEventListener('submit', addTweet);

    document.addEventListener('DOMContentLoaded', () => {
        tweets = JSON.parse(localStorage.getItem('tweets')) || [];

        createHTML();
    });
}


/** Funciones */
function addTweet(e) {
    e.preventDefault();

    /** input donde el usuario escribe */
    const tweet = document.querySelector('#tweet').value;

    /** Validar si el input esta vacio */
    if (tweet === "") {
        emptyInput("campo vacio, por favor dejar un tweet.");
        return;
    }

    tweetObj = {
        id: Date.now(),
        tweet
    };

    /** Añadir el array de tweets */
    tweets = [...tweets, tweetObj];
    console.log(tweets);

    createHTML();

    /** Reiniciar el formulario */
    formulario.reset();
}

function emptyInput(error) {

    const mssgError = document.createElement('p');
    mssgError.textContent = error;
    mssgError.classList.add('error');

    formulario.appendChild(mssgError);

    setTimeout(() => {
        mssgError.remove();
    }, 3000);
}

function clearHTML() {
    while (listaTweets.firstChild) {
        listaTweets.removeChild(listaTweets.firstChild);
    }
}

function createHTML() {

    clearHTML();

    if (tweets.length > 0) {
        tweets.forEach((tweet) => {

            const buttonDelete = document.createElement('a');
            buttonDelete.textContent = "X"
            buttonDelete.classList.add('borrar-tweet');

            buttonDelete.onclick = () => {
                deleteTweet(tweet.id)
            };

            const li = document.createElement('li');
            li.textContent = tweet.tweet;

            li.appendChild(buttonDelete);

            listaTweets.appendChild(li);

        });
    }
    persistence();
}

function deleteTweet(id) {

    tweets = tweets.filter((tweet) => tweet.id !== id);
    createHTML();
    console.log(tweets);
}

function persistence() {
    localStorage.setItem('tweets', JSON.stringify(tweets));
}