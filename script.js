async function includeHTML() {
    let includeElements = document.querySelectorAll('[w3-include-html]');
    for (let i = 0; i < includeElements.length; i++) {
        const element = includeElements[i];
        file = element.getAttribute("w3-include-html"); // "includes/header.html"
        let resp = await fetch(file);
        if (resp.ok) {
            element.innerHTML = await resp.text();
        } else {
            element.innerHTML = 'Page not found';
        }
    }
}


async function getSynonyms() {
    let query = document.getElementById('searchQuery').value;
    let url = `https://www.openthesaurus.de/synonyme/search?q=${query}&format=application/json`;
    let response = await fetch(url);
    let responseAsJson = await response.json();
    let synsets = responseAsJson['synsets'];
    renderSynsets(synsets);
}

function renderSynsets(synsets) {
    let container = document.getElementById('container');
    document.getElementById('searchQuery').value = '';
    container.innerHTML = `<div>Es wurden <b>${synsets.length} Synonym-Sets geladen.</div>`;

    for (let i = 0; i < synsets.length; i++) {
        let synset = synsets[i];
        let terms = synset['terms'];
        container.innerHTML += `
        <div> 
            <h2>${i + 1}. Synonyme</h2>
            <li id="terms${i}" class="list-group-item"></li>
        </div>`;
        for (let j = 0; j < terms.length; j++) {
            let term = terms[j]['term'];
            let level = terms[j]['level']
            let content = document.getElementById('terms' + i);
            if (level == undefined) {
                content.innerHTML += `<p><b>${term}</b></p>`
            } else {
                content.innerHTML += `<p><b>${term}</b> ${level}</p>`
            }
        }
    }
    document.getElementById('result').scrollIntoView({
        behavior: 'smooth'
      });

}
