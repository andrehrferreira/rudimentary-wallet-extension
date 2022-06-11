var tmpWallet = createNewWallet();
let words = tmpWallet.mnemonic.split(" ");

document.querySelector("#mnemonic").innerHTML = words.map(function(value){ 
    return `<p class="wallet-word">${value}</p>`; 
}).join(" ");

document.querySelector("#validateButton").addEventListener("click", function(){
    validateWallet();
})

document.querySelector("#importButton").addEventListener("click", function(){
    importWallet();
});

function saveWallet(wallet){
    chrome.storage.local.set({"wallet": JSON.stringify(wallet)})
}

function createNewWallet(){
    const wallet = ethers.Wallet.createRandom();

    const walletInfo = {
        address: wallet.address,
        privateKey: wallet.privateKey,
        mnemonic: wallet.mnemonic
    }

    return walletInfo;
}

function validateWallet(){
    const inputN = document.querySelector("#mnemonic-validation").value;

    if(tmpWallet.mnemonic === inputN){
        saveWallet(inputN);
        document.querySelector("#mnemonic-validation").value = "";
        alert("Wallet validated!")
        window.close();
    }
    else{
        alert("Invalid wallet");
    }
}

function importWallet(){
    const inputN = document.querySelector("#mnemonic-import").value;

    if(inputN){
        const wallet = ethers.Wallet.fromMnemonic(inputN);

        const walletInfo = {
            address: wallet.address,
            privateKey: wallet.privateKey,
            mnemonic: wallet.mnemonic
        }

        saveWallet(walletInfo);
        document.querySelector("#mnemonic-import").value = "";
        alert("Wallet imported!")
        window.close();
    }
    else{
        alert("Invalid import");
    }
}