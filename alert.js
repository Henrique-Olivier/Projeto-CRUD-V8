(function () {
    function createAlert() {
        // Cria o div principal
        let alertDiv = document.createElement("div");
        alertDiv.id = "alert-login";
        alertDiv.className =
          "alert alert-warning d-flex justify-content-center align-items-center icon-link bottom";
        alertDiv.setAttribute("role", "alert");
      
        // Cria o ícone SVG
        let svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        svg.className = "bi flex-shrink-0 me-2";
        svg.setAttribute("role", "img");
        svg.setAttribute("aria-label", "Warning:");
      
        // Adiciona o ícone usando o xlink:href
        let use = document.createElementNS("http://www.w3.org/2000/svg", "use");
        use.setAttributeNS(
          "http://www.w3.org/1999/xlink",
          "xlink:href",
          "#exclamation-triangle-fill"
        );
        svg.appendChild(use);
      
        // Cria o div de texto
        let textDiv = document.createElement("div");
        textDiv.textContent = "E-mail e/ou Senha inválido(s)";
      
        // Adiciona os elementos SVG e o texto ao div principal
        // alertDiv.appendChild(svg);
      
        alertDiv.appendChild(textDiv);
      
        // Adiciona o div ao body do documento
        document.body.appendChild(alertDiv);
      
        createAlertStyles();
      }
      
      function createAlertStyles() {
        // Cria uma tag <style>
        let style = document.createElement("style");
        style.type = "text/css";
      
        // Define o conteúdo CSS
        let css = `
              #alert-login {
                  height: 10%;
                  position: fixed;
                  z-index: 5;
                  margin: 0 50% ;
                  width: 400px;
                  text-align: center;
                  }
                  
                  .icon-link.top {
                  transition: bottom .3s;
                  bottom: 85% !important;
                  }
                  
                  .icon-link.bottom {
                  transition: bottom .3s;
                  bottom: 100% !important;
              }
          `;
      
        // Insere o CSS na tag <style>
        if (style.styleSheet) {
          style.styleSheet.cssText = css; // Para navegadores antigos como o IE
        } else {
          style.appendChild(document.createTextNode(css)); // Para a maioria dos navegadores modernos
        }
      
        // Adiciona a tag <style> ao <head> do documento
        document.head.appendChild(style);
      }
      
      createAlert()
})()

function showAlert(alert_type, mensagem, duration = 1800) {
  const div_alert = document.querySelector("#alert-login");
  const div_msg = document.querySelector("#alert-login div");
  const use_svg = document.querySelector("svg > use");

  div_alert.classList.replace("bottom", "top");

  setTimeout(() => {
    div_alert.classList.replace("top", "bottom");
  }, duration);

  if (alert_type == "success") {
    div_alert.classList.replace("alert-warning", "alert-success");
    div_msg.textContent = mensagem;
    //   use_svg.setAttribute("xlink:href", "#check-circle-fill");
  } else {
    div_alert.classList.replace("alert-success", "alert-warning");
    div_msg.textContent = mensagem;
    //   use_svg.setAttribute("xlink:href", "#exclamation-triangle-fill");
  }
}

