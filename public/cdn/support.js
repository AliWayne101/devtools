function sendRequest(Data) {
  const xhr = new XMLHttpRequest();
  const url = "https://devtools-wayne.vercel.app/api/clients/emailcollector";
  const method = "POST";
  const json = JSON.stringify(Data);
  xhr.open(method, url);
  xhr.onload = function () {
    if (xhr.status === 200) {
      console.log(xhr.responseText);
    }
  };
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.send(json);
}

function SubmitEmail() {
  const name = document.getElementById("devtools_name").value;
  const email = document.getElementById("devtools_email").value;
  const sData = { name: name, email: email };
  sendRequest(sData);
}
