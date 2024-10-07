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
        const profileInfo = `
            <div class="info">
                <img src="${user.avatarUrl}" alt="Foto do perfil do usuário" />
                <div class="data">
                    <h1>${user.name ?? 'Não possui nome cadastrado 😿'}</h1>
                    <p>${user.bio ?? 'Não possui bio cadastrada 😿'}</p>
                </div>
                <div class="followers-following">
                    <h2>Followers</h2>
                    <ul>
                        <li>
                            <span class="number">${user.followers}</span>
                            <span class="followers">Followers</span>
                        </li>
                        <li>
                            <span class="number">${user.following}</span>
                            <span class="following">Following</span>
                        </li>
                    </ul>
                </div>
            </div>`;
        this.userProfile.innerHTML = profileInfo;
    },

    renderRepositories(repositories) {
        if (repositories.length === 0) return;

        let repositoriesItems = repositories.map(repo => `
            <li>
                <a href="${repo.html_url}" target="_blank">${repo.name}</a>
                <ul class="repositories-info">
                    <li>🍴 ${repo.forks}</li>
                    <li>⭐ ${repo.stars ?? '0'}</li>
                    <li>👀 ${repo.watchers}</li>
                    <li>💻 ${repo.language ?? 'Sem linguagem'}</li>
                </ul>
            </li>`).join('');

        const repositoriesSection = `
            <div class="repositories section">
                <h2>Repositórios</h2>
                <ul>${repositoriesItems}</ul>
            </div>`;
        this.userProfile.innerHTML += repositoriesSection;
    },

    renderEvents(events) {
        if (events.length === 0) return;

        let eventsItems = events.map(event => {
            if (event.payload.commits) {
                return `<li><a href="#"><span class="repo-name">${event.repo.name}</span> -> ${event.payload.commits[0].message}</a></li>`;
            }
            return '';
        }).join('');

        const eventsSection = `
            <div class="events section">
                <h2>Eventos</h2>
                <ul>${eventsItems}</ul>
            </div>`;
        this.userProfile.innerHTML += eventsSection;
    },

    renderNotFound() {
        this.userProfile.innerHTML = "<h3>Usuário não encontrado</h3>";
    }
};

export { screen };