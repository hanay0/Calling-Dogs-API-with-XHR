const selectionMenu = document.querySelector('.dogs-breeds');
const doggosWrapper = document.querySelector('.doggosPic');
selectionMenu.addEventListener('click',loadDoggos);

// function to call the API and get the breeds
function loadDoggos(){
    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'https://dog.ceo/api/breeds/list/all',true);

    xhr.onload = function() {
        if(this.status == 200){
            var dogs = JSON.parse(this.responseText);
            var breedsObj = dogs.message;
            var breedsArray = Object.keys(breedsObj);

            // loop through breedsArray and show breeds inside selection menu
            for(var i in breedsArray){
                const option = document.createElement('option');
                option.innerText = breedsArray[i];

                // append that option into selection menu
                selectionMenu.appendChild(option);
            }
        }
    }

    xhr.send();
}


// set an event listener while changing in the select menu
selectionMenu.addEventListener('change', theEvent => {
    let url = `https://dog.ceo/api/breed/${theEvent.target.value}/images/random`;
    breedName = document.querySelector('.breedName');
    breedName.innerText = (theEvent.target.value);
    getURL(url);
})



// start fetching the url of the image
// 1 : selecting the image which will contain each breed images
const breedImage = document.querySelector('.dog-img');

// 2 : selecting spinner div which contains spinner loading
const spinnerLoading = document.querySelector('.spinner');


function getURL(url){
    
    spinnerLoading.classList.add('show');
    breedImage.classList.remove('show');
    
    var newXHR = new XMLHttpRequest();
    newXHR.open('GET', url, true);

    newXHR.onload = function(){
        
        if(this.status == 200){
            var source = JSON.parse(this.responseText);

            breedImage.src = source.message;
            breedImage.classList.add('res-img');
            
        }
    }
    newXHR.send();
}


breedImage.addEventListener('load', function(){
    spinnerLoading.classList.remove('show');
    breedImage.classList.add('show');
    breedName.classList.add('show');
    
})