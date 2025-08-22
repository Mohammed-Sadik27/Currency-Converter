
// List of supported currencies
const currencies = [
    "AUD", "BGN", "BRL", "CAD", "CHF", "CNY", "CZK", "DKK", "EUR",
    "GBP", "HKD", "HUF", "IDR", "INR", "ISK", "JPY", "KRW",
    "MXN", "MYR", "NOK", "NZD", "PHP", "PLN", "RON", "SEK", "SGD",
    "THB", "TRY", "USD", "ZAR"
]
// Dictionary to hold currency symbols and flags
const currency_dict = {
    "AUD": {"symbol": "$",   "flag": "au"},
    "BGN": {"symbol": "лв",  "flag": "bg"},
    "BRL": {"symbol": "R$",  "flag": "br"},
    "CAD": {"symbol": "$",   "flag": "ca"},
    "CHF": {"symbol": "CHF", "flag": "ch"},
    "CNY": {"symbol": "¥",   "flag": "cn"},
    "CZK": {"symbol": "Kč",  "flag": "cz"},
    "DKK": {"symbol": "kr",  "flag": "dk"},
    "EUR": {"symbol": "€",   "flag": "eu"},
    "GBP": {"symbol": "£",   "flag": "gb"},
    "HKD": {"symbol": "$",   "flag": "hk"},
    "HUF": {"symbol": "Ft",  "flag": "hu"},
    "IDR": {"symbol": "Rp",  "flag": "id"},
    "INR": {"symbol": "₹",   "flag": "in"},
    "ISK": {"symbol": "kr",  "flag": "is"},
    "JPY": {"symbol": "¥",   "flag": "jp"},
    "KRW": {"symbol": "₩",   "flag": "kr"},
    "MXN": {"symbol": "$",   "flag": "mx"},
    "MYR": {"symbol": "RM",  "flag": "my"},
    "NOK": {"symbol": "kr",  "flag": "no"},
    "NZD": {"symbol": "$",   "flag": "nz"},
    "PHP": {"symbol": "₱",   "flag": "ph"},
    "PLN": {"symbol": "zł",  "flag": "pl"},
    "RON": {"symbol": "lei", "flag": "ro"},
    "SEK": {"symbol": "kr",  "flag": "se"},
    "SGD": {"symbol": "$",   "flag": "sg"},
    "THB": {"symbol": "฿",   "flag": "th"},
    "TRY": {"symbol": "₺",   "flag": "tr"},
    "USD": {"symbol": "$",   "flag": "us"},
    "ZAR": {"symbol": "R",   "flag": "za"}
}
// get Elements 
const amount=document.querySelector("#amount_entry");
const converter_btn=document.querySelector("#convert_button");
const from_currency=document.querySelector("#from_currency");
const to_currency=document.querySelector("#to_currency");
const from_currency_flag=document.querySelector(".from_currency img");
const to_currency_flag=document.querySelector(".to_currency img");
const result = document.querySelector("#result_text");
const changeBtn=document.querySelector(".converter img");
// Fill currency options
currencies.forEach(currency=>{
    const option=document.createElement("option");
    option.value=currency;
    option.textContent=currency;
    from_currency.appendChild(option);
    to_currency.appendChild(option.cloneNode(true));  
    
})
// update flags 
function UpdateFlag(type){
    if (type==='From') {
        from_currency_flag.src=`https://flagcdn.com/w640/${currency_dict[from_currency.value].flag}.png`;
    } else {
        to_currency_flag.src=`https://flagcdn.com/w640/${currency_dict[to_currency.value].flag}.png`;
    }
}
// Get rate and convert 
async function convert(from,to,amount){
    if (from===to){
        result.innerHTML=`${amount} ${currency_dict[from].symbol} = ${amount} ${currency_dict[to].symbol}`
    }
    else{
        const resp=await fetch(`https://api.frankfurter.app/latest?amount=${amount}&from=${from}&to=${to}`)
        const data=await resp.json();
        const rate=data.rates[to];
        result.innerHTML=`${amount} ${currency_dict[from].symbol} = ${(amount*rate).toFixed(2)} ${currency_dict[to].symbol}`
    }
}

// Event listeners
converter_btn.addEventListener("click", (event) => {
    convert(from_currency.value, to_currency.value, amount.value);
});
// Change currencies
changeBtn.addEventListener("click",(e)=>{
    const temp=from_currency.value;
    from_currency.value=to_currency.value;
    to_currency.value=temp;
    UpdateFlag("From");
    UpdateFlag("To");
})