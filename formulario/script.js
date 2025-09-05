const form = document.getElementById("cadastroForm");
const mensagem = document.getElementById("mensagem");

form.addEventListener("submit", function(event) {
  event.preventDefault(); // impede envio real
  mensagem.style.display = "block"; // mostra mensagem
  mensagem.style.opacity = 0;

  // Efeito de fade-in
  let opacity = 0;
  const fade = setInterval(() => {
    if (opacity >= 1) {
      clearInterval(fade);
    }
    mensagem.style.opacity = opacity;
    opacity += 0.05;
  }, 30);
});
