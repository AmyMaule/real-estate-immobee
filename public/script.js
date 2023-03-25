const area = document.querySelector("#area");
const property = document.querySelector("#property-type-select");
const keywords = document.querySelector("#keywords");
const minPrice = document.querySelector("#min-price");
const maxPrice = document.querySelector("#max-price");
const minBedrooms = document.querySelector("#min-bedrooms");
const maxBedrooms = document.querySelector("#max-bedrooms");
const minSize = document.querySelector("#min-size");
const maxSize = document.querySelector("#max-size");
const minPlot = document.querySelector("#min-plot");
const maxPlot = document.querySelector("#max-plot");
const numberInputs = document.querySelectorAll(".number-input");
const formSubmit = document.querySelector(".btn-search");
const listingsContainerDOM = document.querySelector(".listings-container");
const noListingsFound = document.querySelector(".no-listings-found");
let listings;

// currently using ref as ID - need unique identifier for each listing

fetch("https://api.npoint.io/046ee5dbdbb3c7760bb0")
  .then(res => res.json())
  .then(data => {
    listings = data;
  });

// const propertyTypeList = ["Maison", "Terrain", "Immeuble", "Appartement"];
// const propertyTypeChoices = propertyTypeList.map(propertyType => {
//   return {
//     value: propertyType,
//     label: propertyType,
//     selected: false
//   }
// })

// const propertyChoices = new Choices("#property-type-select", {
//   removeItemButton: true,
//   duplicateItemsAllowed: false,
//   searchResultLimit: 10,
//   noChoicesText: "No items to choose from",
//   itemSelectText: "",
//   resetScrollPosition: false,
//   choices: propertyTypeChoices
// });

const getSelectedProperties = () => {
  const selectedProperties = [];
  [...property.options].forEach(property => {
    selectedProperties.push(property.value);
  })
  return selectedProperties;
}

const searchListings = (searchQuery) => {
  let matchingListings = [];
  
  // delete properties if values have been left blank in search
  for (let property in searchQuery) {
    if (searchQuery[property] === null) {
      delete searchQuery[property];
    }
  }
  
  listings.forEach((listing, index) => {
    if (listing.agent !== "Jammes Immobilier") {
      return;
    }
    
    // if unknown, these values are set to 0, 99 or 999
    let unknownValues = ["bedrooms", "plot", "rooms", "size"];
    for (let i = 0; i < unknownValues.length; i++) {
      if (listing[unknownValues[i]] === 0 || listing[unknownValues[i]] === 99 || listing[unknownValues[i]] === 999) {
        listing[unknownValues[i]] = "Unknown";
      }
    }
    
    let arrNumberValues = ["bedrooms", "plot", "price", "size"];
    for (let i = 0; i < arrNumberValues.length; i++) {       
      const currentPropertyName = arrNumberValues[i];
      if (searchQuery[currentPropertyName]) {
        if (searchQuery[currentPropertyName][0] === null) {
          if (listing[currentPropertyName] > searchQuery[currentPropertyName][1]) return;
        } else if (searchQuery[currentPropertyName][1] === null) {
          if (listing[currentPropertyName] < searchQuery[currentPropertyName][0]) return;
        } else {
          let [minValue, maxValue] = searchQuery[currentPropertyName].reduce(([prevMin, prevMax], current) => 
          [Math.min(prevMin, current), Math.max(prevMax, current)], [Infinity, -Infinity]);
  
          if (listing[currentPropertyName] < minValue || listing[currentPropertyName] > maxValue) {
            return;
          }
        }
      }
    }

    // check if the listing's postcode is within the area array
    if (searchQuery.hasOwnProperty("area")) {
      let postcodes = searchQuery.area.split(/[ ,]+/);
      if (postcodes.indexOf(listing.postcode) === -1) {
        return;
      }
    }

    // check if the property type matches any of those selected
    if (searchQuery.hasOwnProperty("propertyType")) {
      if (searchQuery.propertyType.indexOf(listing.types) === -1) {
        return;
      }
    }

    // only return listings that match the user's keywords
    if (searchQuery.hasOwnProperty("keywords")) {
      let description = listing.description;
      if (typeof listing.description !== "string") {
        description = listing.description.join("");
      }

      let keywords = searchQuery.keywords.split(/[ ,]+/);
      let keywordMatch;
      keywords.forEach(keyword => {
        if (description.toLowerCase().includes(keyword.toLowerCase())) {
          keywordMatch = true;
        }
      })
      if (!keywordMatch) return;
    }
    
    // push any listings that remain after searching to the matchingListings array
    matchingListings.push(listing);
  }); 
  populateListings(matchingListings);
}

const submitForm = (e) => {
  e.preventDefault();
  const selectedProperties = property.options.length ? getSelectedProperties() : null;

  const numberValues = {
    bedrooms: [minBedrooms.value, maxBedrooms.value],
    plot: [minPlot.value, maxPlot.value],
    price: [minPrice.value, maxPrice.value],
    size: [minSize.value, maxSize.value]
  }

  // store value as null if users have entered neither min or max, otherwise store min or max as null in array
  for (let numberValue in numberValues) {
    let minValue = numberValues[numberValue][0];
    let maxValue = numberValues[numberValue][1];

    numberValues[numberValue] = minValue || maxValue
      ? [Number(minValue) || null, Number(maxValue) || null]
      : null;
  }

  const searchQuery = ({
    area: area.value || null,
    bedrooms: numberValues.bedrooms,
    keywords: keywords.value || null,
    plot: numberValues.plot,
    price: numberValues.price,
    propertyType: selectedProperties || null,
    size: numberValues.size
  });

  searchListings(searchQuery);

  // document.querySelector(".search-criteria-container").reset(); 
}

const getListingDescription = description => {
  if (typeof description === "string") {
    return description.length > 220 ? description.slice(0, 220) : description;
  }
  return description[0].length > 220 ? description[0].slice(0, 220) : description[0];
}

const populateListings = (listings) => {
  if (!listings.length) {
    noListingsFound.classList.remove("hide");
    listingsContainerDOM.innerHTML = "";
  } else {
    noListingsFound.classList.add("hide");
    let listingsHTML = "";
    listings.forEach(listing => {
      listingsHTML +=
        `<div class="listing-container">
          <div class="listing-image-container">
            <div class="img-arrow img-arrow-left">
              <span>&#x27a4;</span>
            </div>
            <img src=${listing.photos[0]} alt="listing-image" class="listing-image" id=${listing.ref}>
            <div class="img-arrow img-arrow-right">
              <span>&#x27A4;</span>
            </div>
          </div>
          <div class="listing-details-container">
            <div class="listing-row">
              <h5 class="listing-bedrooms">
                ${listing.bedrooms} bedrooms
                <span class="divider">|</span>
              </h5>
              <h5 class="listing-rooms">
                ${listing.rooms} rooms
                <span class="divider">|</span>
              </h5>
              <h5 class="listing-price">€${listing.price.toLocaleString()}</h5>
            </div>
            <div class="listing-row listing-icons-container">
              <div class="listing-icon-container">
                <img src="house-size-icon.png" class="listing-icon" alt="icon">
                <h5 class="listing-house-size">${listing.size} m&#178;</h5>
              </div>
              <div class="listing-icon-container">
                <img src="forest-icon.png" class="listing-icon" alt="icon">
                <h5 class="listing-plot-size">${listing.plot} m&#178;</h5>
              </div>
            </div>
            <div class="listing-row">
              <h5 class="listing-location">${listing.postcode}, ${listing.town}</h5>
            </div>
            <div class="listing-row listing-description-row">
              <div class="listing-description">
                ${getListingDescription(listing.description)}
              </div>
            </div>
            <a class="listing-link" href="${listing.link_url}" target="_blank">See original listing</a>
            <div class="listing-row listing-agent-container">
              <h5 class="listing-agent">${listing.agent}</h5>
              <h5 class="listing-ref">Ref: ${listing.ref}</h5>
            </div>
          </div>
        </div>`;
    })

    // after listings description, once solo page is added:
    // <span>...</span>
    // <button class="btn-listing-description-see-more">See more</button>

    listingsContainerDOM.innerHTML = listingsHTML;
  }
  const arrows = document.querySelectorAll(".img-arrow");
  arrows.forEach(arrow => arrow.addEventListener("click", updateImage));
}

// use arrows to cycle through images
const updateImage = (e) => {
  const target = e.target.tagName === "SPAN"
    ? e.target.parentElement
    : e.target;

  const left = target.classList.contains("img-arrow-left");
  const currentImage = left 
    ? target.nextElementSibling
    : target.previousElementSibling;

  listings.forEach(listing => {
    if (listing.ref === currentImage.id) {
      const currentImageElement = document.getElementById(currentImage.id);
      let currentImageIndex = listing.photos.indexOf(currentImage.src);
      
      // if user clicks back on first image, show the last image
      if (left && currentImageIndex !== 0) {
        currentImageElement.src = listing.photos[currentImageIndex - 1];
      } else if (left) {
        currentImageElement.src = listing.photos[listing.photos.length - 1];
      } else if (currentImageIndex === listing.photos.length - 1) {
        currentImageElement.src = listing.photos[0];
      } else {
        currentImageElement.src = listing.photos[currentImageIndex + 1];
      }
      
    }
  });
}

[...numberInputs].forEach(input => {
  input.addEventListener("keydown", (e) => {
    if (e.key <=0 || e.key > 9) return;
    if (e.key >= 0 && e.key <= 9) {
      e.target.value = e.target.value.toLocaleString();
      console.log(e.target.value)
    }
  })
  // function isNumber(e) {
  //   return e.key >= 0 && e.key <= 9;
  // }
})

formSubmit.addEventListener("click", submitForm);