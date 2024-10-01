// Fonction pour effectuer la recherche d'adresses
function searchAddress(query) {
    const url = `https://api-adresse.data.gouv.fr/search/?q=${query}`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            const addresses = data.features;
            const suggestionsBox = document.getElementById('suggestions');

            // Efface les suggestions précédentes
            suggestionsBox.innerHTML = '';

            // Si des résultats existent, les afficher
            if (addresses.length > 0) {
                addresses.forEach(function(address) {
                    const li = document.createElement('li');
                    li.textContent = address.properties.label; // Afficher l'adresse
                    suggestionsBox.appendChild(li);

                    // Ajouter un événement de clic pour choisir une adresse
                    li.addEventListener('click', function() {
                        document.getElementById('searchInput').value = address.properties.label;
                        suggestionsBox.innerHTML = ''; // Effacer les suggestions après sélection
                    });
                });
            } else {
                const li = document.createElement('li');
                li.textContent = 'No results found';
                suggestionsBox.appendChild(li);
            }
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
}

// Ajouter un écouteur d'événements sur le champ de recherche pour les suggestions
document.getElementById('searchInput').addEventListener('input', function() {
    const query = this.value;
    if (query.length > 2) { // Ne pas lancer la recherche avant d'avoir un minimum de 3 caractères
        searchAddress(query);
    } else {
        document.getElementById('suggestions').innerHTML = ''; // Effacer les suggestions si la saisie est trop courte
    }
});
