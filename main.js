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
    const url = `https://openapi.programming-hero.com/api/news/category/${category}`;
    fetch(url)
    .then(res => res.json())
    .then(data => setNewsData(data.data))
};
const setNewsData = datas => {
    const newsElement = document.getElementById('news-container');
    newsElement.innerHTML = '';
    datas.forEach(data => {
        const newsDiv = document.createElement('div');
        newsDiv.innerHTML = `
        <div class="bg-slate-800 rounded-lg flex mt-5 text-white text-lg  p-5 ">
        <img src="${data.thumbnail_url}" alt="" srcset="">
        <div class="p-5">
            <h1>${data.title}</h1>
            <p>${data.details.slice(0, 200)}</p>
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
                <button><i class="fa-solid fa-arrow-right"></i></button>
            </div>
        </div>
    </div>
        `;
        newsElement.appendChild(newsDiv);
    });
};
getCategoryData();