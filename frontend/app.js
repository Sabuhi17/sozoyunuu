
let word="KONTEKST"
let letters=word.split("")
let revealed=new Array(letters.length).fill(false)

function render(){
const div=document.getElementById("letters")
div.innerHTML=""
letters.forEach((l,i)=>{
const box=document.createElement("div")
box.className="box"
box.innerText=revealed[i]?l:""
div.appendChild(box)
})
}

function hint(){
for(let i=0;i<letters.length;i++){
if(!revealed[i]){
revealed[i]=true
break
}
}
render()
}

function check(){
const ans=document.getElementById("answer").value.toUpperCase()
if(ans===word){
alert("Doğru!")
location.reload()
}else{
alert("Yanlış")
}
}

render()
