const placeHolder = document.getElementById("placeHolder");
const picURL = document.querySelector("#pastedURL");
const submitUrl = document.querySelector("#submitUrl");
const memes = document.getElementById("memes");
const divContainer = document.createElement("div");

//Function to update sessionStorage
function updateSessionStorage() {
  const divContainer = placeHolder.querySelectorAll(".container");
  let picMemes = [];
  for (let container of divContainer) {
    const img = container.querySelector("img");
    const topSpan = container.querySelector(".top-text");
    const bottomSpan = container.querySelector(".bottom-text");
    if (img && topSpan && bottomSpan) {
      picMemes.push({ 
        url: img.src,
        topText: topSpan.innerText,
        bottomText: bottomSpan.innerText,
        divClass: container.className,
      });
    }
  }
  sessionStorage.setItem("pic", JSON.stringify(picMemes));
}

document.addEventListener("DOMContentLoaded", function () {
  if (sessionStorage.pic) {
    const picMemes = JSON.parse(sessionStorage.getItem("pic"));
    for (let i = 0; i < picMemes.length; i++) {
      const containerDiv = document.createElement("div");
      const img = document.createElement("img");
      const topSpan = document.createElement("span");
      const bottomSpan = document.createElement("span");
      
      img.src = picMemes[i].url;
      topSpan.innerText = picMemes[i].topText;
      bottomSpan.innerText = picMemes[i].bottomText;

      topSpan.className = "top-text";
      bottomSpan.className = "bottom-text";
      containerDiv.className = picMemes[i].divClass;

      containerDiv.append(topSpan);
      containerDiv.append(img);
      containerDiv.append(bottomSpan);
      placeHolder.append(containerDiv);
    }
  }
});
      

memes.addEventListener("submit", (e) => {
  e.preventDefault();
  if (picURL.value.trim() === "") {
    return;
  }
  const newDiv = document.createElement("div");
  const newImg = document.createElement("img");
  const topText = document.getElementById("topMeme").value;
  const bottomText = document.getElementById("memeBottom").value;

  const topSpan = document.createElement("span");
  topSpan.innerText = topText;
  topSpan.classList.add("top-text");

  const bottomSpan = document.createElement("span");
  bottomSpan.innerText = bottomText;
  bottomSpan.classList.add("bottom-text");
  
  newImg.src = picURL.value;

  newDiv.classList.add("container");

  newDiv.append(topSpan); //First append the text
  newDiv.append(newImg); //Then append the image
  newDiv.append(bottomSpan); //Append bottom text
  placeHolder.append(newDiv); //The place it all 
  updateSessionStorage();

  memes.reset();
  console.log(picURL.value);
});

placeHolder.addEventListener("click", (evt) => {
  if (evt.target.tagName === "IMG") {
    evt.target.parentElement.remove();
    updateSessionStorage();
  }
});

// placeHolder.innerHTML = `<img src=${picURL.value} />`;
// placeHolder.innerHTML = '<img src="' + picURL.value + '" />';
