


function sendCmdDisplayServer(getParams){

    getJSON("http://192.168.90.50:3000/cmd", getParams)
    .then(data => {
        console.log(data);
    });
    
}

function getJSON(url, qs_params) {
    function buildQueryString(params) {
      return Object.entries(params).map(d => `${d[0]}=${d[1]}`).join('&');
    }

    return new Promise((resolve, reject) => {
      const qs = qs_params ? '?' + buildQueryString(qs_params) : '';
      const xhr = new XMLHttpRequest();
      xhr.open('GET', `${url}${qs}`);

      xhr.onload = function() {
        if (xhr.status >= 200 && xhr.status < 400) {
          resolve(JSON.parse(xhr.responseText));
        } else {
          resolve(xhr.responseText);
        }
      };
      xhr.onerror = () => reject(xhr.statusText);
      xhr.send();
    });
  }


  function show_element(id){
    let el = document.getElementById(id)
    if (el.style.display === 'none'){
        el.style.display = '';
    }
  }

  function hide_element(id){
    let el = document.getElementById(id)
    if (el.style.display === ''){
        el.style.display = 'none';
    }
  }