// ------------------------------------------------------------------------
// Plants Array
// ------------------------------------------------------------------------

const arrPlants = [
  {
    name: "Ficus Tree",
    price: 350,
    description: "Graceful and lush, this charming indoor plant boasts glossy, emerald-green leaves that effortlessly brighten any space.",
    image: "plant1.png",
    lightAmount: "low",
    addedDate: "2023-03-25"
  },
  {
    name: "White Sprite Succulent",
    price: 200,
    description: "Delicate and captivating, this rare succulent showcases a mesmerizing silver-white hue that gracefully adorns its petite, fleshy leaves.",
    image: "plant2.png",
    lightAmount: "bright",
    addedDate: "2023-05-01"
  },
  {
    name: "Snake Plant",
    price: 400,
    description: "Boasting tall, sleek, and sword-like leaves, this botanical marvel adds a touch of modern flair to any setting.",
    image: "plant3.png",
    lightAmount: "low",
    addedDate: "2023-07-04"
  },
  {
    name: "Parlour Palm",
    price: 350,
    description: "With its lush, feather-like fronds and compact size, this indoor beauty makes a striking addition to any interior space.",
    image: "plant4.png",
    lightAmount: "low",
    addedDate: "2023-04-29"
  },
  {
    name: "Japanese Maple",
    price: 1200,
    description: "Known for its stunning foliage that transforms with the seasons, this ornamental tree captivates with its delicate, lacy leaves in vibrant shades of red, orange, or gold.",
    image: "plant5.png",
    lightAmount: "bright",
    addedDate: "2023-05-10"
  },
];

let appliedFilter = "";
let appliedSort = "date added";

// ------------------------------------------------------------------------
// When the document loads
// ------------------------------------------------------------------------

$(document).ready(function(){

    console.log("Hello");

    // ------------------------------------------------------------------
    // Home

    // When the document loads, animate the hero image upwards
    $("#hero-image").animate({top: '-=100px'});

    // ------------------------------------------------------------------
    // Browse

    filterSortPlants();

});

// ------------------------------------------------------------------------
// Load all plants
// ------------------------------------------------------------------------

function loadPlants(plantsToShow) {

  // Clear all elements inside the plants cards container

  $("#plantsContainer").empty();

  // Loop though plants

  for (let i = 0; i < plantsToShow.length; i++) {
    const plant = plantsToShow[i];
    
    console.log(plant.name);

    // 1: Select the plants container add the plant card to it
    $("#plantsContainer").append($("#plantCardTemplate").html());

    // 2: Create a variable that contains the most recently added plant card
    let currentChild = $("#plantsContainer").children().eq(i);

    // 3: Set the content for the current plant card from the plant array
    $(currentChild).find("#nameText").text(plant.name);
    $(currentChild).find("#priceText").text(plant.price);
    $(currentChild).find("#descriptionText").text(plant.description);
    $(currentChild).find(".card-img-top").attr('src','assets/' + plant.image);

    // 4: Hide the description text from the curent card
    $(currentChild).find("#descriptionText").hide();
  };

};

// ------------------------------------------------------------------------
// When a filter or sort option is clicked
// ------------------------------------------------------------------------

$("input[name='filterRadio']").click(function(){
  appliedFilter = $(this).attr('value');

  filterSortPlants();
});

$("input[name='sortRadio']").click(function(){
  appliedSort = $(this).attr('value');

  filterSortPlants();
});

function filterSortPlants() {
  
  let filteredSortedArrPlants = [];

  console.log(appliedFilter);
  console.log(appliedSort);

  // Filter Plants

  if (appliedFilter) {
    filteredSortedArrPlants = arrPlants.filter(plant => plant.lightAmount == appliedFilter);
  } else {
    filteredSortedArrPlants = arrPlants;
  }

  // Sort Plants

  if (appliedSort == "low to high") {

    // Sort plants from the lowest to highest price
    filteredSortedArrPlants = filteredSortedArrPlants.sort((a, b) => {
      return a.price - b.price;
    });

  } else if (appliedSort == "date added") {

    // Sort plants from the newest to oldest
    filteredSortedArrPlants = filteredSortedArrPlants.sort((a, b) => {
      let da = new Date(a.addedDate);
      let db = new Date(b.addedDate);
    
      return db - da;
    });

  }

  console.log(filteredSortedArrPlants)

  loadPlants(filteredSortedArrPlants);

}

// ------------------------------------------------------------------------
// When a plant card is clicked
// ------------------------------------------------------------------------

$("#plantsContainer").on('click','.card', function() {

  // Toggle the price & description text
  $(this).find("#priceText").toggle();
  $(this).find("#descriptionText").toggle();

  // Resize the image to fit the additonal content
  $(this).find(".card-img-top").toggleClass("small");

});
