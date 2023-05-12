function sendRequest(Data, _url) {
  const xhr = new XMLHttpRequest();
  const url = "https://devtools-wayne.vercel.app/api/clients/emailcollector";
  const method = "POST";
  const json = JSON.stringify(Data);
  xhr.open(method, url);
  xhr.onload = function () {
    if (xhr.status === 200) {
      console.log(xhr.responseText);
      if (_url.length > 0) {
        window.location.href = _url;
      } else {
        const containerBody = document.getElementsByClassName('dt_container_body');
        containerBody.innerHTML += `<b style="margin-top: 100px;">Your e-mail has been submitted<br>Thank you</b>`;
      }
    }
  };
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.send(json);
}

function SubmitEmail(redirURL) {
  const name = document.getElementById("devtools_name").value;
  const email = document.getElementById("devtools_email").value;
  if (name.length > 0 && email.length > 0 && email.includes('@')) {
    const sData = { name: name, email: email };
    console.log(sData);
    sendRequest(sData, redirURL);
  } else {
    console.log({ name, email });
  }
}
