<script>
  import * as PIXI from 'pixi.js';
  import { onMount } from 'svelte';
  import { saveAs } from 'file-saver';

  let canvasRoot;
  let text = 'text moji';
  let bgColor = '#de3249';
  let dataUrl;

  onMount(() => {
    canvasRoot.appendChild(app.view);
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
    fontSize: 40,
    fill: '#fff',
    wordWrap: true,
    wordWrapWidth: config.width - padding * 2,
    fontWeight: 'bold'
  });

  const basicText = new PIXI.Text(text, style);
  basicText.zIndex = 10;
  basicText.x = padding;
  basicText.y = padding;
  container.addChild(basicText);
  basicText.text = text;

  app.render();
  dataUrl = app.view.toDataURL('image/png');

  const updateText = () => {
    basicText.text = text;
    app.render();
    dataUrl = app.view.toDataURL('image/png');
  };

  const updateBgColor = () => {
    bg.clear();
    bg.beginFill(PIXI.utils.string2hex(bgColor));
    bg.drawRoundedRect(0, 0, config.width, config.height, bgRadius);
    bg.endFill();
    container.addChild(bg);
    dataUrl = app.view.toDataURL('image/png');
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

<main>
  <h1>textmoji</h1>
  <input bind:value={text} on:input={updateText} type="text" />
  <div>
    <input bind:value={bgColor} on:input={updateBgColor} type="color" />
    <div bind:this={canvasRoot} />
  </div>
  <div>
    <img width="32" height="32" src={dataUrl} alt="" />
  </div>
  <div>
    <button on:click={download}>download!</button>
  </div>
</main>
