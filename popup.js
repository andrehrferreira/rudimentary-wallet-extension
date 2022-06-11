chrome.storage.local.get("wallet", function(res){
    try{
        const wallet = JSON.parse(res.wallet);

        if(wallet.address){
            document.querySelector("#address").innerHTML = wallet.address;

            fetch(`http://localhost:3232/balance/${wallet.address}`, {method: 'get', mode: 'no-cors' })
            .then(response => response.text())
            .then((data) => {
               return data ? JSON.parse(data) : {};
            })
            .then((data) => {
                document.querySelector("#balance").innerHTML = data.balance.toLocaleString({style: 'currency'}) + " Coins";
            });
        }
        else{
            chrome.runtime.openOptionsPage();
        }
    }
    catch(e){
        //chrome.runtime.openOptionsPage();
    }
});

document.querySelector("transfer-button")?.addEventListener("click", function(){
    const to = document.querySelector("transfer-to").value;
    const amount = document.querySelector("transfer-amount").value;

    if(to && amount){

    }
    else{
        alert("Error when trying to transfer, please fill in the data correctly");
    }
});

function createTX(){
    const tx = {
        id: generateRandomId(),
        from: this.wallet.address,
        to: to,
        balance: value,
        timestamp: new Date().getTime()
    }
}   

function generateRandomId(){
    return sha1.create().update(new Date().getTime().toString()).hex()
}
