<script>
  import * as PIXI from './pixi.js';

  import { onMount, onDestroy } from 'svelte';
  import { saveAs } from 'file-saver';

  let canvasRoot;
  let text = 'text moji';
  let bgColor = '#013E9A';
  let textColor = '#ffffff';
  let dataUrl;
  let fontSize = 40;

  const config = { width: 100, height: 100 };
  const app = new PIXI.Application({
    width: config.width,
    height: config.height,
    transparent: true,
    antialias: true,
    preserveDrawingBuffer: true
  });

  onMount(() => {
    canvasRoot.appendChild(app.view);
  });

  onDestroy(() => {
    app.destroy(true);
  });

  const container = new PIXI.Container();
  container.sortableChildren = true;
  app.stage.addChild(container);

  const bg = new PIXI.Graphics();
  bg.zIndex = 0;
  const bgRadius = 10;
  bg.beginFill(PIXI.utils.string2hex(bgColor));
  bg.drawRoundedRect(0, 0, config.width, config.height, bgRadius);
  bg.endFill();
  container.addChild(bg);

  const padding = 5;
  const style = new PIXI.TextStyle({
    fontFamily: 'Arial',
    fontSize,
    fill: textColor,
    wordWrap: true,
    wordWrapWidth: config.width - padding * 2,
    fontWeight: 'bold',
    align: 'center'
  });

  const basicText = new PIXI.Text(text, style);
  basicText.zIndex = 10;
  basicText.x = config.width / 2;
  basicText.y = config.height / 2;
  basicText.anchor.set(0.5);
  container.addChild(basicText);
  basicText.text = text;

  const updateCanvas = () => {
    app.render();
    dataUrl = app.view.toDataURL('image/png');
  };

  updateCanvas();

  const updateText = () => {
    basicText.text = text;
    updateCanvas();
  };

  const updateBgColor = () => {
    bg.clear();
    bg.beginFill(PIXI.utils.string2hex(bgColor));
    bg.drawRoundedRect(0, 0, config.width, config.height, bgRadius);
    bg.endFill();
    container.addChild(bg);
    updateCanvas();
  };

  const updateTextColor = () => {
    style.fill = textColor;
    updateCanvas();
  };

  const updateFontSize = () => {
    style.fontSize = fontSize;
    updateCanvas();
  };

  const download = () => {
    app.view.toBlob(blob => saveAs(blob, `textmoji-${getFilename(text)}.png`));
  };

  const getFilename = str => str.replace(/([^a-z0-9]+)/gi, '');
</script>

<style>
  main {
    max-width: 100vh;
    margin: 0 auto;
  }
</style>

<svelte:head>
  <link rel="icon" type="image/png" href={dataUrl} />
</svelte:head>

<main>
  <h1>textmoji</h1>
  <div>
    <input bind:value={text} on:input={updateText} type="text" />
  </div>
  <div>
    <input
      bind:value={textColor}
      on:change={updateTextColor}
      on:input={updateTextColor}
      type="color" />
    <input
      bind:value={bgColor}
      on:change={updateBgColor}
      on:input={updateBgColor}
      type="color" />
  </div>
  <div>
    <input
      bind:value={fontSize}
      min={12}
      max={120}
      step={1}
      type="range"
      on:input={updateFontSize} />
  </div>
  <div>
    <div bind:this={canvasRoot} />
  </div>
  <div>
    <img width="32" height="32" src={dataUrl} alt="" />
  </div>
  <div>
    <button on:click={download}>download!</button>
  </div>
</main>
