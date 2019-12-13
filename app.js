console.log('worked');

const rootEl = document.getElementById('root');
rootEl.className = 'form-inline justify-content-center';

const links = [];

const addFormEl = document.createElement('form'); 
addFormEl.innerHTML = `
    <div class="input-group">
        <input data-id="link" placeholder=" Введите тест или ссылку" size="80">
        <select data-id="type">
            <option value="regular">Текст</option>
            <option value="image">Изображение</option>
            <option value="video">Видео</option>
            <option value="audio">Аудио</option>
        </select>
    <button class="btn btn-primary">Добавить пост</button>
    </div>
`;
const linkEl = addFormEl.querySelector('[data-id=link]');
const typeEl = addFormEl.querySelector('[data-id=type]');

addFormEl.onsubmit = function (ev) {
    ev.preventDefault();
    const value = linkEl.value;
    const type = typeEl.value;
    console.log(type);
    links.push({
        value,
        type,
        likes: 0,
    }); 
    console.log(links);
    linkEl.value = '';
    typeEl.value = 'regular';
    rebuildList(linksEl, links);
};
rootEl.appendChild(addFormEl);

const linksEl = document.createElement('div');
rootEl.appendChild(linksEl);

function rebuildList(containerEl, items) {
    containerEl.innerHTML = '';
    for (const item of [...containerEl.children]) {
        containerEl.removeChild(item)
    }
    items.sort((a, b) => b.likes - a.likes)
    for (const item of items) {
        const linkEl = document.createElement('div');
        linkEl.className = 'card';
        if (item.type === 'regular') {
            linkEl.innerHTML = `
                <div class="card-body">
                    <div class="card-text">${item.value}</div>
                    <button class="btn">👍 ${item.likes}</button>
                    <button class="btn btn-danger" data-action="like">like</button>
                    <button class="btn btn-secondary" data-action="dislike">dislike</button>
                </div>
            `;
        } else if (item.type === 'image') {
            linkEl.innerHTML = `
                <img src="${item.value}" class="card-img-top">
                <div class="card-body">
                    <button class="btn">👍 ${item.likes}</button>
                    <button class="btn btn-danger" data-action="like">like</button>
                    <button class="btn btn-secondary" data-action="dislike">dislike</button>
                </div>
            `;
        } else if(item.type === 'video') {
            linkEl.innerHTML = `
                <iframe src='${item.value}' class="card-img-top"></iframe>
                <div class="card-body">
                    <button class="btn">👍 ${item.likes}</button>
                    <button class="btn btn-danger" data-action="like">like</button>
                    <button class="btn btn-secondary" data-action="dislike">dislike</button>
                </div>`;
        } else if(item.type === 'audio') {
            linkEl.innerHTML = `
                <iframe src="${item.value}" height=350px class="card-img-top"></iframe>
                <div class="card-body">
                    <button class="btn">👍 ${item.likes}</button>
                    <button class="btn btn-danger" data-action="like">like</button>
                    <button class="btn btn-secondary" data-action="dislike">dislike</button>
                </div>`;
        }     
linkEl.querySelector('[data-action=like]').addEventListener('click', function() {
            item.likes++;
            rebuildList(containerEl, items);
        });
        linkEl.querySelector('[data-action=dislike]').addEventListener('click', function() {
            item.likes--;
            rebuildList(containerEl, items);
        });
        containerEl.appendChild(linkEl);
    }
}
