function mostrarGaleria(botao) {
    const galeria = document.getElementById('galeria');

    const estaVisivel = galeria.style.display === 'flex';

    if (estaVisivel) {
        galeria.style.display = 'none';
        botao.textContent = 'Pra sempre nós... 💌';
    } else {
        galeria.style.display = 'flex';
        botao.textContent = 'Fechar 🤗';

        window.scrollBy({
            top: 150,
            behavior: 'smooth'
        });
    }
}

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

class Heart {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 20 + 10;
        this.speed = Math.random() * 1 + 0.5;
    }

    draw() {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.bezierCurveTo(0, -this.size / 2, -this.size, -this.size / 2, -this.size, 0);
        ctx.bezierCurveTo(-this.size, this.size, 0, this.size * 1.5, 0, this.size * 2);
        ctx.bezierCurveTo(0, this.size * 1.5, this.size, this.size, this.size, 0);
        ctx.bezierCurveTo(this.size, -this.size / 2, 0, -this.size / 2, 0, 0);
        ctx.closePath();
        ctx.fillStyle = "rgba(255, 105, 180, 0.6)";
        ctx.fill();
        ctx.restore();
    }

    update() {
        this.y += this.speed;
        if (this.y > canvas.height + this.size * 2) {
            this.y = -this.size * 2;
            this.x = Math.random() * canvas.width;
        }
    }
}

const hearts = Array.from({ length: 40 }, () => new Heart());

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    hearts.forEach(h => {
        h.update();
        h.draw();
    });
    requestAnimationFrame(animate);
}

animate();

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

function mostrarZoom(img) {
  const modal = document.getElementById('modalZoom');
  const modalImg = document.getElementById('imgZoom');

  modal.style.display = 'flex';
  modalImg.src = img.src;
}

// Fecha o modal quando clicar no fundo ou no "×"
function fecharModal() {
  const modal = document.getElementById('modalZoom');
  modal.style.display = 'none';
}

// Adiciona o evento de clique para todas as imagens da galeria
document.querySelectorAll('#galeria img').forEach(img => {
  img.style.cursor = 'pointer';
  img.addEventListener('click', () => mostrarZoom(img));
});

const botaoTopo = document.getElementById("btnTopo");

// Mostrar o botão ao rolar
window.onscroll = function () {
    botaoTopo.style.display = window.scrollY > 300 ? "block" : "none";
};

// Ação do botão
botaoTopo.addEventListener("click", function () {
    window.scrollTo({ top: 0, behavior: "smooth" });
});