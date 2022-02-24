window.onload = function(){
document.addEventListener('init', function(event) {
    // Page navigation
    var page = event.target;
  
    if (page.id === 'pokemon-list') {
        var api_url = "https://pokeapi.co/api/v2/pokemon?limit=100";
        // Define async function
        async function get_pokemon_data(url) {
            
            // Store response
            const response = await fetch(url);
            
            // Store data in form of JSON
            var data = await response.json();
            console.log(data);
            if (response) {
                // Cleat the list
                document.getElementById("my-pokedex").innerHTML = "";
                // Loop to access all rows 
                for (let r of data.results) {
                    // Create a list item and its content
                    const list_item = document.createElement("ons-list-item");
                    const text_content = document.createTextNode(r.name);
                    list_item.appendChild(text_content);
                    list_item.setAttribute("tappable", true);
                    list_item.setAttribute("modifier", "chevron");
                    //list_item.setAttribute("onclick", `loadDetails('${r.url}')`);
                    list_item.onclick = async () =>{
                        document.querySelector('#myNavigator').pushPage('page2.html', {data: {title: r.name, url: r.url}});
                    }
                    // Add the list item to the list view
                    document.getElementById("my-pokedex").appendChild(list_item)
                }
            }
            
        }
        // Calling that async function
        get_pokemon_data(api_url);
    } else if (page.id === 'details') {
        page.querySelector('ons-toolbar .center').innerHTML = page.data.title;
        // Get the pokemon url
        const url = page.data.url;
        // Function to fetch details
        async function get_pokemon_details(url) {
            // Store response
            const response = await fetch(url);
                
            // Store data in form of JSON
            // Add an image, the types and stats
            var data = await response.json();
            console.log(data);
            // Adding sprite image
            const image = document.createElement("img");
            image.setAttribute("src", data.sprites.front_default);
            const image_div = document.createElement("div");
            image_div.setAttribute("class", "img-center");
            image_div.appendChild(image);
            const name_para = document.createElement("p");
            name_para.setAttribute("class", "img-name");
            const name = document.createTextNode(data.name + " #" + data.id);
            name_para.appendChild(name);
            document.getElementById("detail-contents").appendChild(image_div);
            document.getElementById("detail-contents").appendChild(name_para);
            // Adding the types
            const types_div = document.createElement("div");
            types_div.setAttribute("class", "types");
            let heading = document.createElement("h3");
            let heading_title = document.createTextNode("Types");
            heading.appendChild(heading_title);
            types_div.appendChild(heading);
            for(let p of data.types){
                const para = document.createElement("p");
                const type = document.createTextNode(p.type.name);
                para.appendChild(type);
                types_div.appendChild(para);
            }
            document.getElementById("detail-contents").appendChild(types_div);
            // Adding the stats
            const stats_div = document.createElement("div");
            stats_div.setAttribute("class", "stats");
            heading = document.createElement("h3");
            heading_title = document.createTextNode("Stats");
            heading.appendChild(heading_title);
            stats_div.appendChild(heading);
            for(let p of data.stats){
                const para = document.createElement("p");
                // Add the name, effort and base stats
                const stat = document.createTextNode(p.stat.name+" "+p.effort+" "+p.base_stat);
                para.appendChild(stat);
                stats_div.appendChild(para);
            }
            document.getElementById("detail-contents").appendChild(stats_div);
        }
        // Calling that async function
        get_pokemon_details(url);
    }

});

}