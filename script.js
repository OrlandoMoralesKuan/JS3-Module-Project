const allEpisodes = getAllEpisodes();
//You can edit ALL of the code here
/*const state = {
  getAllEpisodes: [],
  searchTerm: "",
};

function fetchfilms() {
  return fetch("https://api.tvmaze.com/shows/82/episodes")
    .then((res) => res.json())
    .then((data) => {
      return data;
    });
}
fetchfilms()
  .then(function (films) {
    if (films) {
      state.getAllEpisodes = films;
    }
  })
  .catch((err) => {
    return "Error occurred";
  });*/

function setup() {
  makePageForEpisodes(allEpisodes);

  addSearchFunctionality(allEpisodes);
  addEpisodeSelector(allEpisodes);
  //addFooterContent();
}

function makePageForEpisodes(episodeList) {
  const contCard = document.getElementById("contCard");
  contCard.innerHTML = "";

  const currentCount = document.querySelector("#currentEpisodeCount");
  currentCount.innerText = episodeList.length;

  const allCount = document.querySelector("#allEpisodeCount");
  allCount.innerText = allEpisodes.length;

  for (episode of episodeList) {
    const movieList = document.getElementById("root").content.cloneNode(true);
    movieList.querySelector("h1").textContent = episode.name;
    const seasonCode = document.createElement("span");
    seasonCode.textContent = ` - S${String(episode.season).padStart(2, "0")}`;
    movieList.querySelector("h1").append(seasonCode);
    const episodeCode = document.createElement("span");
    episodeCode.textContent = `E${String(episode.number).padStart(2, "0")}`;
    movieList.querySelector("h1").append(episodeCode);
    movieList.querySelector("img").setAttribute("src", episode.image.medium);

    const summary = document.createElement("div");
    summary.innerHTML = episode.summary;
    const sanitizedSummary = summary.textContent;
    movieList.querySelector("p").textContent = sanitizedSummary;
    contCard.appendChild(movieList);
  }
}

function addSearchFunctionality(allEpisodes) {
  const searchInput = document.getElementById("search");
  searchInput.addEventListener("input", function () {
    const searchTerm = searchInput.value.trim().toLowerCase();
    const filteredEpisodes = allEpisodes.filter(
      (episode) =>
        episode.name.toLowerCase().includes(searchTerm) ||
        episode.summary.toLowerCase().includes(searchTerm)
    );
    makePageForEpisodes(filteredEpisodes);
    const resultCount = document.getElementById("resultCount");
  });
}

function addEpisodeSelector(allEpisodes) {
  const episodeSelector = document.getElementById("episodeSelector");
  allEpisodes.forEach((episode) => {
    const option = document.createElement("option");
    option.value = episode.id;
    option.textContent = `S${String(episode.season).padStart(2, "0")}E${String(
      episode.number
    ).padStart(2, "0")} - ${episode.name}`;
    episodeSelector.appendChild(option);
  });

  episodeSelector.addEventListener("change", function () {
    const selectedEpisodeId = episodeSelector.value;
    if (selectedEpisodeId === "default") {
      makePageForEpisodes(allEpisodes);
    } else {
      const selectedEpisode = allEpisodes.find(
        (episode) => episode.id === parseInt(selectedEpisodeId)
      );
      makePageForEpisodes([selectedEpisode]);
    }
  });
}

function addFooterContent() {
  const footer = document.querySelector("footer");

  const tvmazeLink = document.createElement("a");
  tvmazeLink.href = "https://www.tvmaze.com/";
  tvmazeLink.textContent = "TVMaze.com";
  tvmazeLink.target = "_blank";

  const attributionText = document.createTextNode("Data provided by ");

  footer.appendChild(attributionText);
  footer.appendChild(tvmazeLink);
}

window.onload = setup;
