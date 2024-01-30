let input = document.querySelector('input');
let getBtn = document.querySelector('button');
let reposData = document.querySelector('.show-data');

getBtn.onclick = () => {
    getRepos();
}

getRepos = () => {
    (input.value == '' || input.value == null) ? alert('Fill the Input')  : fetchUser(); 
}

fetchUser = () => {
    fetch(`https://api.github.com/users/${input.value}/repos`)
        .then(response => response.json())
        .then((repos) => {
            reposData.innerHTML = '';
            repos.forEach(repo => {
                let mainDiv = document.createElement('div');
                let repoName = document.createTextNode(repo.name);
                mainDiv.appendChild(repoName);
                reposData.appendChild(mainDiv);
                
                let url = document.createElement('a');
                let urlTxt = document.createTextNode('visit');
                url.appendChild(urlTxt);
                url.href = `http://github.com/${input.value}/${repo.name}`;
                url.target = '_blank';
                mainDiv.appendChild(url);

                let starSpan = document.createElement('span');
                let starsTxt = document.createTextNode(`Stars ${repo.stargazers_count}`);
                starSpan.appendChild(starsTxt);
                mainDiv.appendChild(starSpan);
                mainDiv.className = 'repo-box';
                reposData.appendChild(mainDiv);
            });
        });
}