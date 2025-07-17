playbouton?.addEventListener("click", (e) => {
    e.preventDefault();
    if (gameSection && pongsection && page_ac) {
        gameSection.classList.add("hidden");
        page_ac.classList.add("hidden");
        pongsection.classList.remove("hidden");
    }
});


function drawpong()
{
  const canvas = document.getElementById("pong") as HTMLCanvasElement;
  const ctx = canvas.getContext("2d");
  if (!ctx) {
    throw new Error("Impossible de récupérer le contexte du canvas");
  }

  // ligne de separation discontinue
  ctx.strokeStyle = "white";
  ctx.beginPath();
  ctx.moveTo(canvas.width / 2, 0);
  ctx.setLineDash([5, 5]);
  ctx.lineTo(canvas.width / 2, canvas.height);
  ctx.stroke();

  let paddleWidth1 = 10;
  let paddleHeight1 = 60;
  let paddleWidth2 = 10;
  let paddleHeight2 = 60;

  ctx.fillStyle = "white";
  ctx.fillRect(0,canvas.height / 2 - 30,paddleWidth1,paddleHeight1);
  ctx.fillRect(canvas.width - paddleWidth2, canvas.height / 2 - 30,paddleWidth2,paddleHeight2);
  
  // balle
  ctx.beginPath();
  ctx.arc(canvas.width / 2, canvas.height / 2, 6, 0, Math.PI * 2);
  ctx.fillStyle = "white";
  ctx.fill(); 
 
  console.log("Pong game initialized");
}

drawpong();

