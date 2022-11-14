const form =document.forms["generate-form"];
const qr = document.querySelector(".qrcode");

const generateQR = e => {
  e.preventDefault();
  
  clearUI();

  const url = form.url.value;
  const size = form.size.value;

  if(url === ""){
    alert("Please Enter a URL");
  }
  else{
    showSpinner();

    setTimeout(() => {
      hideSpinner();
      generateQRCode(url, size);

      setTimeout(() => {
        const saveURL = qr.querySelector("img").getAttribute("src");
        createSaveBtn(saveURL);
      }, 50);
    }, 1000);
  }
};

const generateQRCode = (url, size) => {
  var qrcode = new QRCode("qrcode", {
    text: url,
    width: size,
    height: size,
    colorDark : "#000000",
    colorLight : "#ffffff",
    correctLevel : QRCode.CorrectLevel.H
  });
};

const showSpinner = () => {
  document.querySelector(".spinner").style.display = "block";
};

const hideSpinner = () => {
  document.querySelector(".spinner").style.display = "none";
};

const clearUI = () => {
  qr.innerHTML = "";
  const saveLink = document.querySelector(".save-link");
  if(saveLink){
    saveLink.remove();
  }
}

const createSaveBtn = saveUrl => {
  const link = document.createElement("a");
  link.classList = "save-link bg-red-500 hover:bg-red-700 text-white font-bold py-2 rounded w-1/3 m-auto my-5";
  link.href = saveUrl;
  link.download = "qrcode";
  link.innerHTML = "Save Image";
  document.querySelector(".generated").appendChild(link); 
}

hideSpinner();

form.addEventListener("submit", generateQR);