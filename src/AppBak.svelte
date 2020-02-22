<script>
  // import { onMount } from "svelte";
  import html2canvas from "html2canvas";

  // let canvas;
  let word = "";
  let canvas;
  let preview;
  // let ctx;

  // onMount(() => {
  //   ctx = canvas.getContext("2d");

  //   drawCanvas();
  // });

  // function drawCanvas() {
  //   const ctx = canvas.getContext("2d");
  //   ctx.clearRect(0, 0, canvas.width, canvas.height);

  //   ctx.fillStyle = "green";
  //   ctx.fillRect(10, 10, 150, 100);
  //   ctx.font = "48px serif";

  //   ctx.strokeText(word, 10, 50);
  // }

  // function handleChange(event) {
  //   drawCanvas();
  // }
  async function handleClick() {
    const canvasFoo = await html2canvas(canvas);
    preview.innerHTML = "";
    preview.appendChild(canvasFoo);
  }
</script>

<style>
  main {
    max-width: 100vh;
    margin: 0 auto;
  }

  canvas {
    width: 50%;
    height: 50%;
    border: 2px solid black;
    margin: 0 auto;
    display: block;
  }

  .canvas-wrap {
    display: flex;
  }

  div.canvas {
    width: 50%;
    display: inline-block;
  }

  #foo {
    background: pink;
    color: white;
    font-size: 100px;
  }

  div + div {
    margin-top: 20px;
    text-align: center;
  }
</style>

<main>
  <!-- <div>
    <canvas bind:this={canvas} width={500} height={500} />
  </div> -->
  <div class="canvas-wrap">
    <div bind:this={canvas} class="canvas dom" id="foo">{word}</div>
    <div class="canvas preview">
      <div bind:this={preview} />
    </div>

  </div>
  <div>
    <input bind:value={word} type="text" />
    <button on:click={handleClick}>click</button>
  </div>
</main>
