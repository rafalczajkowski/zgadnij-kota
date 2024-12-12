document.addEventListener('DOMContentLoaded', () => {
    // Definiujemy pary obrazków
    const pairs = [
        { kot: 'images/kot1.jpg', inne: 'images/inne1.jpg' },
        { kot: 'images/kot2.jpg', inne: 'images/inne2.jpg' },
        { kot: 'images/kot3.jpg', inne: 'images/inne3.jpg' }
    ];

    let currentPairIndex = 0; // index aktualnej pary
    let score = 0; // licznik punktów za poprawne wybory

    const galleryDiv = document.querySelector('.gallery');
    const resultDiv = document.getElementById('result');

    function showPair(index) {
        // Czyścimy poprzednie obrazki i komunikat
        galleryDiv.innerHTML = '';
        resultDiv.textContent = '';
        resultDiv.className = '';

        if (index >= pairs.length) {
            // Brak kolejnych par - czas na ocenę wyniku
            showFinalResult();
            return;
        }

        // Pobieramy aktualną parę
        const pair = pairs[index];

        // Losujemy kolejność wyświetlania
        const order = Math.random() < 0.5 ? ['kot', 'inne'] : ['inne', 'kot'];

        // Tworzymy elementy img
        const img1 = document.createElement('img');
        const img2 = document.createElement('img');

        img1.src = pair[order[0]];
        img1.setAttribute('data-type', order[0]);
        img2.src = pair[order[1]];
        img2.setAttribute('data-type', order[1]);

        galleryDiv.appendChild(img1);
        galleryDiv.appendChild(img2);

        // Podpinamy zdarzenie kliknięcia
        img1.addEventListener('click', onImageClick);
        img2.addEventListener('click', onImageClick);
    }

    function onImageClick(event) {
        const clickedType = event.target.getAttribute('data-type');
        if (clickedType === 'kot') {
            resultDiv.textContent = 'Dobrze, to kot!';
            resultDiv.className = 'success';
            score++; // zwiększamy punkt za poprawny wybór
        } else {
            resultDiv.textContent = 'Źle, to nie kot!';
            resultDiv.className = 'error';
        }

        // Po kilku sekundach przechodzimy do następnej pary
        setTimeout(() => {
            currentPairIndex++;
            showPair(currentPairIndex);
        }, 2000); // tu ustawiasz, ile sekund czekać (2000ms = 2s)
    }

    function showFinalResult() {
        // Na końcu sprawdzamy liczbę punktów i wyświetlamy ocenę
        if (score === 3) {
            resultDiv.textContent = "super znasz koty";
            resultDiv.className = 'success';
        } else {
            // To oznacza, że gracz zdobył 1 lub 2 punkty (lub 0, jeśli wszystkie były złe)
            resultDiv.textContent = "słabo znasz koty";
            resultDiv.className = 'error';
        }
    }

    // Na starcie pokazujemy pierwszą parę
    showPair(currentPairIndex);
});
