var pokeinfoEl = document.querySelector("#pokeinfo");
var currentPokemon = 1;

function back() {
  currentPokemon--;
  if (currentPokemon < 1) {
    currentPokemon = 1;
  }
  getPokemon(currentPokemon);
}

function next() {
  currentPokemon++;
  getPokemon(currentPokemon);
}

function getPokemon(pokedexId) {
  axios
    .get(`https://pokeapi.co/api/v2/pokemon/${pokedexId}`)
    .then((response) => {
      pokeinfoEl.innerHTML = `
          <div class="card" style="padding: 30px">
            <div class="circle mt-3 ${response.data.types[0].type.name}">
              <img
                class="pixelated"
                src="${response.data.sprites.front_default}"
              />
            </div>
            <div class="card-body">
              <h3 class="card-title text-center">${
                response.data.name.charAt(0).toUpperCase() +
                response.data.name.slice(1)
              }</h3>
              <div class="row mt-3">
                <div class="col-4">
                  <p class="mb-2 fw-bold"><i class="fas fa-heart"></i> HP</p>
                  <span>${response.data.stats[0].base_stat}</span>
                </div>
                <div class="col-4">
                  <p class="mb-2 fw-bold">
                    <i class="fas fa-dice-d20"></i> Attack
                  </p>
                  <span>${response.data.stats[1].base_stat}</span>
                </div>
                <div class="col-4">
                  <p class="mb-2 fw-bold"><i class="fas fa-shield-alt"></i> Defence</p>
                  <span>${response.data.stats[2].base_stat}</span>
                </div>
              </div>

              <div class="row mt-3">
                <div class="col-6 d-grid gap-2">
                  <button ${
                    pokedexId == 1 ? "disabled" : ""
                  } type="button" class="btn btn-light ${
        response.data.types[0].type.name
      }" onclick="back()">
                  <i class="fas fa-arrow-left"></i>
                  </button>
                </div>
                <div class="col-6 d-grid gap-2">
                  <button type="button" class="btn btn-light ${
                    response.data.types[0].type.name
                  }" onclick="next()">
                  <i class="fas fa-arrow-right"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
        `;
    });
}

getPokemon(currentPokemon);
