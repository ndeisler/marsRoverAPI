

const baseURL = "https://api.nasa.gov/mars-photos/api/v1/rovers/";

const select = document.querySelector(".rovers");
const num = document.querySelector("#num");
const key = "QTK7xbodhwPfvCYTRRb3uoJzzYnKoMDQmn6oPWtS";
let url;

const searchForm = document.querySelector("form");
const spaceShips = document.querySelector("ul");
const rover = document.querySelector(".rover");
const img = document.querySelector("img");
const div = document.querySelector(".imageInfo");
const roversImg = document.querySelector("#opportunity")
const h2 = document.querySelector(".h2");
const h1 = document.querySelector(".h1");
const p = document.querySelector(".p")
searchForm.addEventListener("submit", fetchNASA);

select.addEventListener('change', (event) =>{
    event.preventDefault();
    // let rover = event.target.value;
    if(event.target.value == "opportunity") {
        h1.innerText = "Opportunity";
        h2.innerText = "Landing date: 2004-01-25";
        p.innerText = "Photos are organized by the sol (Martian rotation or day) on which they were taken, counting up from the rover's landing date. Opportunity has a max of 5111 sol days! Please choose a number between 1-5111 to get all the photos taken on that sol day.";
    } else if (event.target.value === "spirit") {
        h1.innerText = "Spirit";

        h2.innerText = "Landing date: 2004-01-04";
        p.innerText = "Photos are organized by the sol (Martian rotation or day) on which they were taken, counting up from the rover's landing date. Spirit has a max of 2208 sol days! Choose a sol day between 1-2208 to get all the photos taken on that sol day.";
    } else if (event.target.value === "curiosity") {
        h1.innerText = "Curiosity";

        h2.innerText = "Landing date: 2012-08-06";
        p.innerText = "Photos are organized by the sol (Martian rotation or day) on which they were taken, counting up from the rover's landing date. Curiosity has a max of 2297 sol days! Choose a sol day between 1-2208 to get all the photos taken on that sol day.";
        
    }
})

function fetchNASA(e) {
    e.preventDefault();
    
    if (select.value === "") {
        alert("Pick a ROVER");
    } else if (num.value === "") {
        alert("put in a Number");
    } else {
        // curiosity/photos?sol=1000&api_key=DEMO_KEY
        url = baseURL + "/" + select.value + "/photos?sol=" + num.value + "&api_key=" + key;

        fetch(url).then(result => {
            console.log("REsult", result);
            return result.json();
        }).then(json => {
            displayResults(json);
        })
    }

    
}

function displayResults(json) {
    while(div.firstChild) {
        div.removeChild(div.firstChild);
    }
    console.log("Results:", json);
    
    
    // let randomPic = json.photos[Math.floor(Math.random() * json.photos.length)];
    let photo = json.photos;
    if (photo.length === 0) {
        alert("no pictures taken today");
    }
    // let roverName = randomPic.rover.name;
    console.log(photo[0].earth_date);
    let h1 = document.createElement("h1");
    let ul = document.createElement("ul");
    h1.innerText = photo[0].earth_date;
    div.append(h1);
    div.appendChild(ul);


    for (var i = 0; i < json.photos.length; i++) {
        let img = document.createElement("img");
        let div2 = document.createElement("div");
        let li = document.createElement("li");
        let link = document.createElement("a");


        img.src = photo[i].img_src;
        div2.setAttribute("class", "photo");
        div.appendChild(div2);
        div2.appendChild(link);
        link.appendChild(img);
        link.href = img.src;
        link.setAttribute("target", "_blank");
        li.appendChild(div2);
        ul.appendChild(li);
    }

    // if (json.photos.length <= 0) {
        
    //     alert("There are no photos from this Mars sol day. Try another number!")
    // } else {
    //     img.src = randomPic.img_src;
    //     rover.innerHTML = roverName;
        
    // }
    // // img.src = randomPic.img_src;
    

    
}