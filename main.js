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
            <button class="hover:text-purple-700">${data.category_name}</button>
        `;
        categoryDiv.appendChild(div);
    });
};
getCategoryData();