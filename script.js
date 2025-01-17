const BASIC_URL =
  "https://v6.exchangerate-api.com/v6/082f73d35e94ac3667538e22/pair";

let selectElements = document.querySelectorAll("select");
let btn=document.querySelector("button")
let msg=document.querySelector(".msg-contain");
let fromcur=document.querySelector(".from select");
let tocur=document.querySelector(".to select");
for (let select of selectElements) {
  for (let curcode in countryList) {
    let newOption = document.createElement("option");
    newOption.innerText = curcode;
    newOption.value = curcode;
    select.append(newOption);
    if (curcode === "INR" && select.name === "from") {
      newOption.selected = "selected"
    }
    if (curcode === "USD" && select.name === "to") {
      newOption.selected = "selected"
    }
  }
  select.addEventListener("change", (e) => {
    flag(e.target)
  })
}
function flag(element) {
  let curcode = element.value;
  let concode = countryList[curcode]
  let newsrc = `https://flagsapi.com/${concode}/flat/64.png`
  let img = element.parentElement.querySelector("img")
  img.src = newsrc

}
btn.addEventListener("click",async(e)=>{
  e.preventDefault()
  let amt=document.querySelector(".amount input")
  let amtVal=amt.value;
  console.log(amtVal);
  if(amtVal<0 || amtVal===""){
    amtVal=1;
    amt.value=1;
  }

const URL=`${BASIC_URL}/${fromcur.value}/${tocur.value}`;
let covrt=await fetch (URL)
console.log(covrt)
let data=await covrt.json()
let rate=data.conversion_rate;
console.log(rate)
let final=rate*amtVal;
msg.innerText=`${amtVal} ${fromcur.value} = ${final} ${tocur.value}`
});





