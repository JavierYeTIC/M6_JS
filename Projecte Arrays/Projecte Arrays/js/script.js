// POKEMONS
let dades;
let arrayPokemon = [];
let sortOrder = 'asc';
let selectedValue;
// POKEMONS
async function getpokemon() {
    //try {
        const response = await fetch("js/data/pokemon.json");
        const data = await response.json();
        
        dades = data.pokemon;
        console.log(dades);
        console.log(dades[0].name);
   // } catch (error) {
    //    console.error('Error fetching Pokemon data:', error);
   // }
}

// MUNICIPIS
async function getmunicipis() {
    try {
        const response = await fetch("js/data/municipis.json");
        const data = await response.json();
        
        dades = data.elements;  // Adjust this line based on your actual data structure
        console.log(dades);
        console.log(dades[0].municipi_nom);
    } catch (error) {
        console.error('Error fetching municipis data:', error);
    }
}

// METEORITS
async function getearthMeteorites() {
    try {
        const response = await fetch("js/data/earthMeteorites.json");
        const data = await response.json();
        
        dades = data;  // Adjust this line based on your actual data structure
        console.log(dades);
        console.log(dades[0].name);
    } catch (error) {
        console.error('Error fetching earthMeteorites data:', error);
    }
}

// MOVIES
async function getmovies() {
    try {
        const response = await fetch("js/data/movies.json");
        const data = await response.json();
        
        dades = data.movies;  // Adjust this line based on your actual data structure
        console.log(dades);
        console.log(dades[0].title);
    } catch (error) {
        console.error('Error fetching movies data:', error);
    }
}

function displayTable(pokemonArray) {
    const tableContainer = document.getElementById("resultat");
    const table = document.createElement("table");

    // Creating table headers
    const headerRow = table.insertRow(0);

    for (const key in pokemonArray[0]) {
        const headerCell = document.createElement("th");
        headerCell.textContent = key;
        
        // Determine if the column is 'name' or 'img'
        const isTextColumn = key ;

        // Add click listener to the header cell
        headerCell.onclick = () => orderToggle(key, isTextColumn);
        
        headerRow.appendChild(headerCell);
    }

    // Creating data rows
    for (const pokemon of pokemonArray) {
        const row = table.insertRow();
        for (const key in pokemon) {
            const cell = row.insertCell();
            if (key === "img") {
                const imgElement = document.createElement("img");
                imgElement.src = pokemon[key];
                imgElement.alt = "Pokemon Image";
                cell.appendChild(imgElement);
            } else {
                cell.textContent = pokemon[key];
            }
        }
    }

    // Appending the table to the container
    tableContainer.appendChild(table);
}


function inicial(){
    location.reload();
}

async function loadData() {
    selectedValue = document.getElementById("dataSelector").value;
    
    try {
        switch (selectedValue) {
            case "pokemon":
                await getpokemon();
                break;
            case "municipis":
                await getmunicipis();
                break;
            case "earthMeteorites":
                await getearthMeteorites();
                break;
            case "movies":
                await getmovies();
                break;
            default:
                console.error('Invalid option selected.');
        }
    } catch (error) {
        console.error('Error loading data:', error);
    }
}


async function inicialNou() {
    const tableContainer = document.getElementById("resultat");
    tableContainer.innerHTML = "";

    const table = document.createElement("table");
    arrayPokemon = [];

    try {
        // Llamar a la función loadData para cargar el conjunto de datos seleccionado
        await loadData();

        switch (selectedValue) {
            case "pokemon":
                for (let index = 0; index < dades.length; index++) {
                    const pokemonData = {
                        id: dades[index].id,
                        num: dades[index].num,
                        name: dades[index].name,
                        img: dades[index].img,
                    };
                    arrayPokemon.push(pokemonData);
                }
                break;
            case "municipis":
                for (let index = 0; index < dades.length; index++) {
                    const pokemonData = {
                        name: dades[index].municipi_nom,
                        img: dades[index].municipi_bandera,
                        ine: dades[index].ine,
                        altitud: dades[index].altitud,
                    };
                    arrayPokemon.push(pokemonData);
                }
                break;
            case "earthMeteorites":
                for (let index = 0; index < dades.length; index++) {
                    const pokemonData = {
                        id: dades[index].id,
                        recclass: dades[index].recclass,
                        name: dades[index].name,
                    };
                    arrayPokemon.push(pokemonData);
                }
                break;
            case "movies":
                for (let index = 0; index < dades.length; index++) {
                    const pokemonData = {
                        name: dades[index].title,
                        year: dades[index].year,
                        img: dades[index].url,
                        language: dades[index].language,
                    };
                    arrayPokemon.push(pokemonData);
                }
                break;
            default:
                console.error('Invalid option selected.');
        }
        
        // Displaying the table
        displayTable(arrayPokemon);
    } catch (error) {
        console.error('Error in printList:', error);
    }

}

function orderAsc() {
    let tableContainer = document.getElementById("resultat");
    tableContainer.innerHTML = "";

    // Call the displayTable function again to update the table
    const columna = getColumnToSort();  // Obtén la columna dinámicamente
    // Sort the array in ascending order based on the columna property
    arrayPokemon.sort((a, b) => {
        const valueA = typeof a[columna] === 'string' ? a[columna].toLowerCase() : a[columna];
        const valueB = typeof b[columna] === 'string' ? b[columna].toLowerCase() : b[columna];
        return valueA < valueB ? -1 : (valueA > valueB ? 1 : 0);
    });

    displayTable(arrayPokemon);
}

function orderDesc() {
    let tableContainer = document.getElementById("resultat");
    tableContainer.innerHTML = "";

    // Call the displayTable function again to update the table
    const columna = getColumnToSort();  // Obtén la columna dinámicamente
    // Sort the array in descending order based on the columna property
    arrayPokemon.sort((a, b) => {
        const valueA = typeof a[columna] === 'string' ? a[columna].toLowerCase() : a[columna];
        const valueB = typeof b[columna] === 'string' ? b[columna].toLowerCase() : b[columna];
        return valueB < valueA ? -1 : (valueB > valueA ? 1 : 0);
    });

    displayTable(arrayPokemon);
}


// Función para obtener la primera columna del array para ordenar dinámicamente
function getColumnToSort() {
    // Verifica si hay al menos un elemento en el array
    if (arrayPokemon.length > 0) {
        // Obtiene las claves (nombres de las propiedades) del primer elemento del array
        const keys = Object.keys(arrayPokemon[0]);

        // Devuelve la primera clave como la columna a ordenar
        return keys[0].toString();
    } else {
        // Si el array está vacío, devuelve una columna predeterminada (puedes ajustar esto según tus necesidades)
        return 'defaultColumn';
    }
}


async function searchList() {
    const searchTerm = prompt("Introdueix el nom del Pokémon a buscar:");

    // Cargar el conjunto de datos seleccionado
    await loadData();

    if (searchTerm) {
        const filteredPokemon = arrayPokemon.filter(pokemon => pokemon.name.toLowerCase().includes(searchTerm.toLowerCase()));

        if (filteredPokemon.length > 0) {
            // Crear y mostrar la tabla con los resultados de la búsqueda
            createAndShowTable(filteredPokemon);
        } else {
            alert(`No s'han trobat Pokémon amb el nom "${searchTerm}".`);
        }
    } else {
        alert("No has introduït cap nom de Pokémon per buscar.");
    }
}

function createAndShowTable(filteredPokemon) {
    const tableContainer = document.getElementById("resultat");
    tableContainer.innerHTML = "";

    const table = document.createElement("table");

    // Crear encabezados de tabla
    const headerRow = table.insertRow(0);
    for (const key in filteredPokemon[0]) {
        const headerCell = document.createElement("th");
        headerCell.textContent = key;
        headerRow.appendChild(headerCell);
    }

    // Crear filas de datos
    for (const pokemon of filteredPokemon) {
        const row = table.insertRow();
        for (const key in pokemon) {
            const cell = row.insertCell();
            if (key === "img") {
                const imgElement = document.createElement("img");
                imgElement.src = pokemon[key];
                imgElement.alt = "Pokemon Image";
                cell.appendChild(imgElement);
            } else {
                cell.textContent = pokemon[key];
            }
        }
    }

    // Añadir la tabla al contenedor
    tableContainer.appendChild(table);
}



function calcMitjana() {
    // Assumeix que tens un array de valors numèrics (per exemple, pesos en kg)
    const pesos = [6.9, 8.5, 9.0];

    const suma = pesos.reduce((acc, peso) => acc + peso, 0);
    const mitjana = suma / pesos.length;

    const mitjanaAmbDosDecimals = mitjana.toFixed(2);

    alert(`La mitjana dels pesos dels Pokémon és: ${mitjanaAmbDosDecimals} kg`);
}

async function printList() {
    const tableContainer = document.getElementById("resultat");
    tableContainer.innerHTML = "";

    const table = document.createElement("table");
    arrayPokemon = [];

    try {
        // Llamar a la función loadData para cargar el conjunto de datos seleccionado
        await loadData();

        switch (selectedValue) {
            case "pokemon":
                for (let index = 0; index < dades.length; index++) {
                    const pokemonData = {
                        id: dades[index].id,
                        img: dades[index].img,
                        name: dades[index].name,
                        pes: dades[index].weight,
                    };
                    arrayPokemon.push(pokemonData);
                }
                break;
            case "municipis":
                for (let index = 0; index < dades.length; index++) {
                    const pokemonData = {
                        name: dades[index].municipi_nom,
                        img: dades[index].municipi_bandera,
                        ine: dades[index].ine,
                        altitud: dades[index].altitud,
                    };
                    arrayPokemon.push(pokemonData);
                }
                break;
            case "earthMeteorites":
                for (let index = 0; index < dades.length; index++) {
                    const pokemonData = {
                        id: dades[index].id,
                        recclass: dades[index].recclass,
                        name: dades[index].name,
                    };
                    arrayPokemon.push(pokemonData);
                }
                break;
            case "movies":
                for (let index = 0; index < dades.length; index++) {
                    const pokemonData = {
                        name: dades[index].title,
                        year: dades[index].year,
                        img: dades[index].url,
                        language: dades[index].language,
                    };
                    arrayPokemon.push(pokemonData);
                }
                break;
            default:
                console.error('Invalid option selected.');
        }
        
        // Displaying the table
        displayTable(arrayPokemon);
    } catch (error) {
        console.error('Error in printList:', error);
    }
}


function orderToggle(columna, isTextColumn) {
    let tableContainer = document.getElementById("resultat");
    tableContainer.innerHTML = "";

    // Invierte el orden al hacer clic
    sortOrder = sortOrder === 'asc' ? 'desc' : 'asc';

    // Ordena el array en función del orden y la columna seleccionada
    arrayPokemon.sort((a, b) => {
        // Comprueba si es una columna de texto
        if (isTextColumn) {
            const valueA = a[columna].toString().toLowerCase();
            const valueB = b[columna].toString().toLowerCase();
            return sortOrder === 'asc' ? valueA.localeCompare(valueB) : valueB.localeCompare(valueA);
        } else {
            // Si es una columna numérica, convierte los valores a números antes de comparar
            const valueA = parseFloat(a[columna]);
            const valueB = parseFloat(b[columna]);
            return sortOrder === 'asc' ? valueA - valueB : valueB - valueA;
        }
    });

    // Actualiza la tabla
    displayTable(arrayPokemon);
}


///Parte dos
function generarGrafico(labels, data) {
    // Verificar si hay un gráfico existente en el canvas
    const existingChart = Chart.getChart("myChart");

    // Destruir el gráfico existente si hay uno
    if (existingChart) {
        existingChart.destroy();
    }

    const borderColor = labels.map(() => getRandomColor());
    const backgroundColor = borderColor.map(color => color.replace(")", ", 0.2)").replace("rgb", "rgba"));

    const config = {
        type: 'polarArea',
        data: {
            labels: labels,
            datasets: [{
                label: 'Cantidad de Pokémon por Tipo',
                data: data,
                backgroundColor: backgroundColor,
                borderColor: borderColor,
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    };

    const myChart = new Chart(document.getElementById('myChart'), config);
}

// Resto del código...


function graficPo() {
    const tableContainer = document.getElementById("myChart");
    tableContainer.innerHTML = "";
    const arrayLabelsPo = ["Grass", "Poison", "Fire", "Flying", "Water", "Bug", "Normal", "Electric", "Ground", "Fighting", "Psychic", "Rock", "Ice", "Ghost", "Dragon"];
    const arrayDataPo = [14, 33, 12, 19, 32, 12, 24, 9, 14, 8, 14, 11, 5, 3, 3];
    generarGrafico(arrayLabelsPo, arrayDataPo);
}

function graficMo() {
    const tableContainer = document.getElementById("myChart");
    tableContainer.innerHTML = "";
    const arrayLabelsMo = [
        "Drama", "Crime", "Action", "Thriller", "Biography", "History",
        "Adventure", "Fantasy", "Western", "Romance", "Sci-Fi", "Mystery",
        "Comedy", "War", "Family", "Animation", "Musical", "Music", "Horror",
        "Film-Noir", "Sport"
    ];
    const arrayDataMo = [
        185, 53, 39, 60, 27, 15, 57, 28, 8, 27, 32, 33, 44, 28, 25, 22, 5, 8, 4, 6, 10
    ];
    generarGrafico(arrayLabelsMo, arrayDataMo);
}

function getRandomColor() {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    return `rgb(${r}, ${g}, ${b})`;
}

// Función para filtrar en tiempo real
async function filterList() {
    await loadData();
    const searchTerm = document.getElementById('txtSearch').value.toLowerCase();
    if (searchTerm) {
        const filteredPokemon = arrayPokemon.filter(pokemon => searchTerm.split(' ').every(term => pokemon.name.toLowerCase().includes(term.toLowerCase())));

        if (filteredPokemon.length > 0) {
            // Llamar a la función para mostrar la tabla con los resultados de la búsqueda
            createAndShowTable(filteredPokemon);
        }
    }
}


addSortEvents();


