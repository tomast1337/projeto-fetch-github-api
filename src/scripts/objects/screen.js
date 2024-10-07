const screen = {
    userProfile: document.querySelector('.profile-data'),

    renderUser(user) {
        this.clearProfile();
        this.renderProfileInfo(user);
        this.renderRepositories(user.repositories);
        this.renderEvents(user.events);
    },

    clearProfile() {
        this.userProfile.innerHTML = '';
    },

    renderProfileInfo(user) {
        const infoDiv = document.createElement('div');
        infoDiv.className = 'info';

        const img = document.createElement('img');
        img.src = user.avatarUrl;
        img.alt = 'Foto do perfil do usuário';
        infoDiv.appendChild(img);

        const dataDiv = document.createElement('div');
        dataDiv.className = 'data';

        const nameH1 = document.createElement('h1');
        nameH1.textContent = user.name ?? 'Não possui nome cadastrado 😿';
        dataDiv.appendChild(nameH1);

        const bioP = document.createElement('p');
        bioP.textContent = user.bio ?? 'Não possui bio cadastrada 😿';
        dataDiv.appendChild(bioP);

        infoDiv.appendChild(dataDiv);

        const followersFollowingDiv = document.createElement('div');
        followersFollowingDiv.className = 'followers-following';

        const followersH2 = document.createElement('h2');
        followersH2.textContent = 'Followers';
        followersFollowingDiv.appendChild(followersH2);

        const ul = document.createElement('ul');

        const followersLi = document.createElement('li');
        const followersSpanNumber = document.createElement('span');
        followersSpanNumber.className = 'number';
        followersSpanNumber.textContent = user.followers;
        followersLi.appendChild(followersSpanNumber);

        const followersSpanText = document.createElement('span');
        followersSpanText.className = 'followers';
        followersSpanText.textContent = 'Followers';
        followersLi.appendChild(followersSpanText);

        ul.appendChild(followersLi);

        const followingLi = document.createElement('li');
        const followingSpanNumber = document.createElement('span');
        followingSpanNumber.className = 'number';
        followingSpanNumber.textContent = user.following;
        followingLi.appendChild(followingSpanNumber);

        const followingSpanText = document.createElement('span');
        followingSpanText.className = 'following';
        followingSpanText.textContent = 'Following';
        followingLi.appendChild(followingSpanText);

        ul.appendChild(followingLi);

        followersFollowingDiv.appendChild(ul);
        infoDiv.appendChild(followersFollowingDiv);

        this.userProfile.appendChild(infoDiv);
    },

    renderRepositories(repositories) {
        if (repositories.length === 0) return;

        const repositoriesSection = document.createElement('div');
        repositoriesSection.className = 'repositories section';

        const h2 = document.createElement('h2');
        h2.textContent = 'Repositórios';
        repositoriesSection.appendChild(h2);

        const ul = document.createElement('ul');

        repositories.forEach(repo => {
            const li = document.createElement('li');

            const a = document.createElement('a');
            a.href = repo.html_url;
            a.target = '_blank';
            a.textContent = repo.name;
            li.appendChild(a);

            const repoInfoUl = document.createElement('ul');
            repoInfoUl.className = 'repositories-info';

            const forksLi = document.createElement('li');
            forksLi.textContent = `🍴 ${repo.forks}`;
            repoInfoUl.appendChild(forksLi);

            const starsLi = document.createElement('li');
            starsLi.textContent = `⭐ ${repo.stars ?? '0'}`;
            repoInfoUl.appendChild(starsLi);

            const watchersLi = document.createElement('li');
            watchersLi.textContent = `👀 ${repo.watchers}`;
            repoInfoUl.appendChild(watchersLi);

            const languageLi = document.createElement('li');
            languageLi.textContent = `💻 ${repo.language ?? 'Sem linguagem'}`;
            repoInfoUl.appendChild(languageLi);

            li.appendChild(repoInfoUl);
            ul.appendChild(li);
        });

        repositoriesSection.appendChild(ul);
        this.userProfile.appendChild(repositoriesSection);
    },

    renderEvents(events) {
        if (events.length === 0) return;

        const eventsSection = document.createElement('div');
        eventsSection.className = 'events section';

        const h2 = document.createElement('h2');
        h2.textContent = 'Eventos';
        eventsSection.appendChild(h2);

        const ul = document.createElement('ul');

        events.forEach(event => {
            if (event.payload.commits) {
                const li = document.createElement('li');
                const a = document.createElement('a');
                a.href = '#';
                a.innerHTML = `<span class="repo-name">${event.repo.name}</span> → ${event.payload.commits[0].message}`;
                li.appendChild(a);
                ul.appendChild(li);
            }
        });

        eventsSection.appendChild(ul);
        this.userProfile.appendChild(eventsSection);
    },

    renderNotFound() {
        this.userProfile.innerHTML = "<h3>Usuário não encontrado</h3>";
    }
};

export { screen };