const getCategoryData = () => {
    const url = `https://openapi.programming-hero.com/api/news/categories`;
    fetch(url)
        .then(res => res.json())
        .then(data => setCategoryData(data.data.news_category))
};
const setCategoryData = (datas) => {
    datas.forEach(data => {
        const categoryDiv = document.getElementById('category');
        const div = document.createElement('h1');
        div.innerHTML = `
            <div onclick="getNewsData('${data.category_id}')" class="hover:text-purple-700 cursor-pointer">${data.category_name}</div>
        `;
        categoryDiv.appendChild(div);
    });
};
const getNewsData = (category) => {
    spinner(true);
    const url = `https://openapi.programming-hero.com/api/news/category/${category}`;
    fetch(url)
        .then(res => res.json())
        .then(data => setNewsData(data.data))
};
const setNewsData = datas => {
    const newsElement = document.getElementById('news-container');
    const itemCount = datas.length;
    if(itemCount === 0){
        const emptyNews = document.getElementById('empty-news');
        emptyNews.classList.remove('hidden');
        const counter = document.getElementById('counter');
        counter.classList.add('hidden');
    }
    else{
        const emptyNews = document.getElementById('empty-news');
        emptyNews.classList.add('hidden');
        const counter = document.getElementById('counter');
        counter.classList.remove('hidden');
    }
    const counter = document.getElementById('counter');
    counter.innerHTML = `<div class ="bg-slate-800 rounded-lg text-white text-lg m-5  p-5 block">${itemCount} News Found in this category</div>`;
    newsElement.innerHTML = '';
    datas.forEach(data => {
        const newsDiv = document.createElement('div');
        newsDiv.innerHTML = `
        <div class="bg-slate-800 rounded-lg flex mt-5 text-white text-lg  p-5">
        <img src="${data.thumbnail_url}" alt="" srcset="">
        <div class="p-5">
            <h1>${data.title}</h1>
            <p>${data.details.slice(0, 200)}...</p>
            <div class="flex justify-between items-center mt-10">
                <div class="flex">
                    <img class="h-12" src="${data.author.img}" alt="">
                    <div class="ml-2">
                        <h1>${data.author.name}</h1>
                        <p>${data.author.published_date}</p>
                    </div>
                </div>
                <h1><i class="fa-regular fa-eye"></i> ${data.total_view}</h1>
                <div class="flex">
                    <i class="fa-regular fa-star"></i>
                    <i class="fa-regular fa-star"></i>
                    <i class="fa-regular fa-star"></i>
                    <i class="fa-regular fa-star"></i>
                    <i class="fa-regular fa-star"></i>
                </div>
                <label onclick="getId('${data._id}')" for="my-modal" class="btn modal-button"><i class="fa-solid fa-arrow-right"></i></label>
            </div>
        </div>
    </div>
        `;
        newsElement.appendChild(newsDiv);
    });
    spinner(false);
};
const getId = id => {
    const url = `https://openapi.programming-hero.com/api/news/${id}`;
    fetch(url)
        .then(res => res.json())
        .then(data => setModalData(data.data))
}
const setModalData = (datas) => {
    datas.forEach(data => {
        const title = document.getElementById('title');
        title.innerText = data.title;
        const body = document.getElementById('body');
        body.innerText = data.details;
    })
};
const spinner = (load) => {
    const spin = document.getElementById('spinner');
    if (load === true) {
        spin.classList.remove('hidden');
    }
    else {
        spin.classList.add('hidden');
    }
};
getCategoryData();