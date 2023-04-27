let movieList = document.getElementById("ul");
let currentGenre = "";
let modal1 = document.getElementById("myModal1");
let modal2 = document.getElementById("myModal2");
let price = Math.floor((Math.random() * 100) + 160);
let convenienceFee = 1;

async function genre() {
    let apiResponse = await fetch("https://api.themoviedb.org/3/genre/movie/list?api_key=64eaa44e1f77f1d33b0f7119e0c0f6eb");
    let data = await apiResponse.json();
    console.log(data.genres)
    for (let i = 0; i < data.genres.length; i++) {
        let li = document.createElement("li");
        document.getElementById("genremovieList").appendChild(li);
        li.textContent = `${data.genres[i].name}`;
        li.addEventListener("click", () => {
            currentGenre = data.genres[i].name;
            document.getElementById("title").textContent = currentGenre;
            genreWiselist(`${data.genres[i].id}`)
        })
    }
}

async function genreWiselist(id) {
    let apiResponse = await fetch(`https://api.themoviedb.org/3/discover/movie?api_key=64eaa44e1f77f1d33b0f7119e0c0f6eb&include_video=true&page=1&with_genres=${id}`);
    let data = await apiResponse.json();
    document.getElementById("movieContainer").innerHTML = "";
    for (let i = 0; i < data.results.length; i++) {
        let span = document.createElement("span");
        let image = document.createElement("img");
        image.setAttribute("src", `https://image.tmdb.org/t/p/w300${data.results[i].poster_path}`);
        span.appendChild(image);
        let title = document.createElement("h5");
        title.textContent = `${data.results[i].title}`;
        let ratingAndLang = document.createElement("div");
        let language = document.createElement("p");
        language.textContent = `${data.results[i].original_language}`;
        let rating = document.createElement("p");
        rating.textContent = `${data.results[i].vote_average}`;
        ratingAndLang.appendChild(language);
        ratingAndLang.appendChild(rating);
        document.getElementById("movieContainer").appendChild(span);
        span.appendChild(title);
        span.appendChild(ratingAndLang);
        span.addEventListener("click", () => {
            document.getElementById("descriptionContainer").innerHTML = "";
            modal1.style.display = "block";
            let span = document.getElementById("close1");
            span.onclick = function () {
                modal1.style.display = "none";
            }
            window.onclick = function (event) {
                if (event.target == modal1) {
                    modal1.style.display = "none";
                }
            }
            let descriptionDiv = document.createElement("div");
            descriptionDiv.setAttribute("id", "descriptionDiv");
            let html = `
                    <div id="image">
                        <img src="https://image.tmdb.org/t/p/w500${data.results[i].backdrop_path}"/>
                    </div>
                    <div id="decscription">
                        <h2>${data.results[i].title}</h2>
                        <span>
                            <i class="fa-solid fa-star"></i>
                            <h5>${data.results[i].vote_average}/10</h5>
                        </span>
                        <p>${data.results[i].original_language}</p>
                        <p>${data.results[i].overview}</p>
                    </div>
                    <h6>Price : ${price}Rs</h6>
                    <br>
                    <button type="button" id="bookBtn" onClick='checkoutPageEvent("${data.results[i].title}")'>Book</button>
                    `;
            descriptionDiv.innerHTML = html;
            document.getElementById("descriptionContainer").appendChild(descriptionDiv);
        })
    }
}


async function movieContainer() {
    let apiResponse = await fetch("https://api.themoviedb.org/3/movie/now_playing?api_key=64eaa44e1f77f1d33b0f7119e0c0f6eb&language=en-US&page=1");
    let data = await apiResponse.json();
    document.getElementById("movieContainer").innerHTML = "";
    console.log(data.results);
    for (let i = 0; i < data.results.length; i++) {
        let span = document.createElement("span");
        let image = document.createElement("img");
        image.setAttribute("src", `https://image.tmdb.org/t/p/w300${data.results[i].poster_path}`);
        span.appendChild(image);
        let title = document.createElement("h5");
        title.textContent = `${data.results[i].title}`;
        let ratingAndLang = document.createElement("div");
        let language = document.createElement("p");
        language.textContent = `${data.results[i].original_language}`;
        let rating = document.createElement("p");
        rating.textContent = `${data.results[i].vote_average}`;
        ratingAndLang.appendChild(language);
        ratingAndLang.appendChild(rating);
        document.getElementById("movieContainer").appendChild(span);
        span.appendChild(title);
        span.appendChild(ratingAndLang);
        span.addEventListener("click", () => {
            document.getElementById("descriptionContainer").innerHTML = "";
            modal1.style.display = "block";
            let span = document.getElementById("close1");
            span.onclick = function () {
                modal1.style.display = "none";
            }
            window.onclick = function (event) {
                if (event.target == modal1) {
                    modal1.style.display = "none";
                }
            }
            let descriptionDiv = document.createElement("div");
            descriptionDiv.setAttribute("id", "descriptionDiv");
            let html = `
                    <div id="image">
                        <img src="https://image.tmdb.org/t/p/w500${data.results[i].backdrop_path}"/>
                    </div>
                    <div id="decscription">
                        <h2>${data.results[i].title}</h2>
                        <span id="ratingSpan">
                            <i class="fa-solid fa-star"></i>
                            <h5>${data.results[i].vote_average}/10</h5>
                        </span>
                        <p id="lang">${data.results[i].original_language}</p>
                        <p>${data.results[i].overview}</p>
                    </div>
                    <h6>Price : ${price}Rs</h6>
                    <br>
                    <button type="button" id="bookBtn" onClick='checkoutPageEvent("${data.results[i].title}")'>Book</button>
                    `;
            descriptionDiv.innerHTML = html;
            document.getElementById("descriptionContainer").appendChild(descriptionDiv);

        })
    }
}

function checkoutPageEvent(title) {
    document.getElementById("checkOutPageDiv").innerHTML = "";
    modal2.style.display = "block";
    let span = document.getElementById("close2");
    span.onclick = function () {
        modal2.style.display = "none";
    }
    window.onclick = function (event) {
        if (event.target == modal2) {
            modal2.style.display = "none";
        }
    }
    let checkOutPageDiv = document.createElement("div");
    checkOutPageDiv.setAttribute("id", "checkOutPageDiv");
    let html = `
        <nav>
            <button type="button"><a href="index.html">Back</a></button>
            <h1>Checkout</h1>
        </nav>
        <main id="checkoutMain">
            <div id="checkoutPageContentDiv">
                <section id="section1">
                    <h3>Summary</h3>
                    <h5>${title}</h5>
                    <span class="ticketDetails">
                        <p>Classic Tickets</p>
                        <p>${price}Rs</p>
                    </span>
                    <span class="ticketDetails">
                        <p>Number of Tickets</p>
                        <input type="number" max="6" min="1" value="1" oninput="convenienceFee = parseInt(event.target.value)">
                    </span>
                    <span class="ticketDetails">
                        <p>Convenience Fee (1.75%)</p>
                        <p>RS ${(((price*1.75)/100)*convenienceFee).toFixed(2)}</p>
                    </span>
                    <hr>
                    <span class="ticketDetails">
                        <p>Sub total</p>
                        <p>RS ${((((price*1.75)/100)*convenienceFee ) + price).toFixed(2)}</p>
                    </span>
                    
                </section>
                <section id="section2">
                    <h3>Payment</h3>
                    <span id="userPersonalDetails">
                        <label for="firstName">First Name</label>
                        &nbsp;
                        <input type="text" id="firstName" >
                        &nbsp;&nbsp;
                        <label for="lastName">Last Name</label>
                        &nbsp;
                        <input type="text" id="lastName" >
                        &nbsp;&nbsp;
                        <label for="email">Email</label>
                        &nbsp;
                        <input type="email" id="email" placeholder="you@example.com">
                    </span>
                    <hr>
                    <input type="radio" name="Credit Card" id="creditCard">
                    <label for="creditCard">Credit Card</label>
                    <input type="radio" name="" id="debitCard">
                    <label for="debitCard">Debit Card</label>
                    <input type="radio" name="" id="upi">
                    <label for="upi">UPI</label>
                    <input type="text" style="width: 100%; height: 30px;">
                    <pre>Full name as displayed on card</pre>
                    <p>Credit card number</p>
                    <input type="number" style="width: 100%; height: 30px;">
                    <p>Expiration</p>
                    <input type="text" style="width: 100%; height: 30px;">
                    <p>CVV</p>
                    <input type="text" style="width: 100%; height: 30px;">
                    &nbsp;
                    <button style="width: 100%; height: 50px; background-color: rgb(74, 155, 248); color: white; border-radius: 10px; border: none;">Procced to pay</button>
                </section>
            </div>
        </main>
                    `;
    checkOutPageDiv.innerHTML = html;
    document.getElementById("checkOutPageDiv").appendChild(checkOutPageDiv);
}

genre();
movieContainer();