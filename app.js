const nav = document.querySelector('nav');
const detail = document.querySelector('#detail');
console.log(detail);

const state = {
    puppies: [],
    singlePuppy: null
}


const fetchPuppies = async()=>{
    const response = await fetch('https://fsa-puppy-bowl.herokuapp.com/api/2307-ftb-et-web-ft/players');
    const json = await response.json();
    const puppies = json.data;
    state.puppies = puppies.players;
  
   render();
  };

  const render = ()=> {
    const hash = window.location.hash.slice(1)*1;  
    const html = state.puppies.map(puppy => {
      return `
        <a>
        <a href='#${puppy.id !== hash ? puppy.id : ''}' class='${ puppy.id === hash ? 'selected': ''}'>
        ${puppy.name} <p>${puppy.breed}</p>
        </a>
      `;
    }).join('');
    nav.innerHTML = html;

    const puppy = state.puppies.find( puppy => {
        return puppy.id === hash;
    });

    let detailHtml = 'Welcome to the Puppy Bowl! Please select a puppy to view.';
    if(puppy){
        detailHtml = `
        <h2>${puppy.name}</h2><p>${ puppy.breed}</p>
        <div style='background-image:url(${ puppy.imageUrl })'>
        </div>
    `;
    }

    detail.innerHTML = detailHtml;
  }

  window.addEventListener('hashchange', () => {
    render();
  });

  fetchPuppies();