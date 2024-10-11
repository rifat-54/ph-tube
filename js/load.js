
const loadData=()=>{
    fetch('https://openapi.programming-hero.com/api/phero-tube/categories')
    .then(res=>res.json())
    .then(data=>showData(data.categories))
    
}

const loadCatogori=(id)=>{
    fetch(`https://openapi.programming-hero.com/api/phero-tube/category/${id}`)
    .then(res=>res.json())
    .then(data=>{
        makeRed()
        const btn=document.getElementById(`btn-${id}`)
    btn.classList.add('active')
        showVedios(data.category)
    })
    .catch(err=>console.log(err));
}

const makeRed=()=>{
    const btn=document.getElementsByClassName('btn')

    for(let item of btn){
        item.classList.remove('active')
    }
    
    
}
// makeRed()
const showData=(data)=>{
    const btnContainer=document.getElementById('btn-container');
    data.forEach(item => {
        const btn=document.createElement('div');
        // btn.classList.add('btn');
        btn.innerHTML=`
            <button id="btn-${item.category_id}" onclick="loadCatogori(${item.category_id})" class="btn">${item.category}</button>
        `
        btnContainer.append(btn);
        // makeRed()
    });
    console.log(data)
}

const loadVedio=(search="")=>{
    fetch(`https://openapi.programming-hero.com/api/phero-tube/videos?title=${search}`)
    .then(res=>res.json())
    .then(data=>showVedios(data.videos))
    .catch(err=>console.log(err))
}

const showTime=(time)=>{
        const hour=parseInt(time/3600);
        const remaingSecond=time%3600;
        const minute=parseInt(remaingSecond/60);
        const second=remaingSecond%60;
        return `${hour} hour ${minute} min ${second} sec ago`
}

const loadDetails=async(id)=>{
    const res=await fetch(`https://openapi.programming-hero.com/api/phero-tube/video/${id}`)
    const data=await res.json()
    displayDetails(data.video)
}

const displayDetails=(vedio)=>{
    console.log(vedio)
    const detalsContainer=document.getElementById('details-container');
    detalsContainer.innerHTML=`
    <img class="w-8/12 h-8/12 rounded-md" src="${vedio.thumbnail}">
    <p>${vedio.description}</p>
    `


    document.getElementById('customModal').showModal()
}

const showVedios=(vedios)=>{
    const vedioContaier=document.getElementById('vedios')
    vedioContaier.innerHTML="";
    if(vedios.length==0)
    {
        vedioContaier.classList.remove('grid')
        vedioContaier.innerHTML=`
        <div class="flex flex-col mt-8 justify-center items-center">
        <img class="w-28" src="assets/Icon.png">
        <h1 class="text-2xl font-bold mt-2">In this categori has no vedio</h1>
        </div>
        `
        return;
    }else{
        vedioContaier.classList.add('grid')
    }
    vedios.forEach(vedio=>{
        const div=document.createElement('div');
        div.innerHTML=`
        <div class="card card-compact ">
  <figure class="h-[200px] relative">
    <img class="w-full h-full object-cover rounded-md"
      src=${vedio.thumbnail} />
      ${vedio.others.posted_date?.length==0?" ":`<span class="absolute bg-black text-sm text-white right-2 bottom-2 p-2 rounded">${showTime(vedio.others.posted_date)}</span>`}
      
      
  </figure>
  <div class="card-body flex">

    <div >
        <img class="w-10 h-10 object-cover rounded-full" src=${vedio.authors[0].profile_picture} />
    </div>
    <div>
        <h2 class="font-bold text-xl">${vedio.title}</h2>
        <div class="flex justify-center">
            <p class="font-semibold">${vedio.authors[0].profile_name}</p>
            ${vedio.authors[0].verified===true?' <img class="w-6" src="https://img.icons8.com/?size=96&id=102561&format=png"/> ':""}
            
        </div>
        <p></p>
    </div>
 
    <button onclick="loadDetails('${vedio.video_id}')" class="btn btn-error text-white">Details</button>
    </div>
  </div>
</div>
        `

        vedioContaier.append(div);
    })
}

    document.getElementById('input-id').addEventListener("keyup",(e)=>{
        loadVedio(e.target.value)
    })

loadData()
loadVedio()