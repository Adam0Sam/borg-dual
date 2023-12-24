const display = async () =>{
    const api = await fetch("http://borg.licejus.lt:1337/api/index");
    const index = await api.json();
    for(let names in index.data.attributes){
        let selected = document.querySelector(`.${names}`);
        if(selected &&  selected.tagName.toLowerCase() != 'ul'){
            // console.log(index.data.attributes[names])
            document.querySelector(`.${names}`).innerHTML = index.data.attributes[names];
        }
        else if(selected && selected.tagName.toLowerCase() == 'ul'){
            let items = index.data.attributes[names].split("\n");
            // console.log(items);
            selected.innerHTML=``;
            for(let item in items){
                selected.innerHTML+=`<li style="color: black">${items[item]}</li>`;
            }
            // console.log(list);
        }
    }
    // console.log(index.data.attributes);
}

display();