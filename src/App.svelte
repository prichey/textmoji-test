<script>
  import * as PIXI from "pixi.js";
  import { onMount } from "svelte";
  import { saveAs } from "file-saver";

  let container;
  let text = "text moji";
  let dataUrl;

  onMount(() => {
    container.appendChild(app.view);
  });

  const config = { width: 100, height: 100 };
  const app = new PIXI.Application({
    width: config.width,
    height: config.height,
    transparent: true,
    antialias: true,
    // view: view,
    preserveDrawingBuffer: true
  });

  const bg = new PIXI.Graphics();
  const bgRadius = 10;
  bg.beginFill(0xde3249);
  bg.drawRoundedRect(0, 0, config.width, config.height, bgRadius);
  bg.endFill();
  app.stage.addChild(bg);
  const padding = 5;
  const style = new PIXI.TextStyle({
    fontFamily: "Arial",
    fontSize: 40,
    fill: "#fff",
    wordWrap: true,
    wordWrapWidth: config.width - padding * 2,
    fontWeight: "bold"
  });

  const basicText = new PIXI.Text(text, style);
  basicText.x = padding;
  basicText.y = padding;
  app.stage.addChild(basicText);
  basicText.text = text;

  app.render();
  dataUrl = app.view.toDataURL("image/png");

  const updateText = () => {
    basicText.text = text;
    app.render();
    dataUrl = app.view.toDataURL("image/png");
  };

  const download = () => {
    app.view.toBlob(blob => saveAs(blob, `textmoji-${getFilename(text)}.png`));
  };

  const getFilename = str => str.replace(/([^a-z0-9]+)/gi, "");
</script>

<style>
  main {
    max-width: 100vh;
    margin: 0 auto;
  }
</style>

<main>
  <h1>textmoji</h1>
  <div>
    <input bind:value={text} on:input={updateText} type="text" />
    <div bind:this={container} />
    <!-- <canvas bind:this={view} /> -->
  </div>
  <div>
    <img width="32" height="32" src={dataUrl} alt="" />
  </div>
  <div>
    <button on:click={download}>download!</button>
  </div>
</main>
