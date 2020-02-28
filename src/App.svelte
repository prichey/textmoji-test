<script>
  import * as PIXI from './pixi.js';

  import { onMount, onDestroy } from 'svelte';
  import { saveAs } from 'file-saver';
  import { debounce } from 'debounce';

  import { canvasProps, fonts } from './config.yaml';
  import { text, bgColor, fontColor, fontSize, fontFamily } from './store';
  import { loadWebfonts, sanitizeFilename } from './utils';

  window.WebFontConfig = {
    google: {
      families: fonts.map(font => `${font.replace('+', '')}`)
    },

    active() {
      initText();
    }
  };

  let canvasRoot;
  let dataUrl;
  let basicText;

  const app = new PIXI.Application({
    width: canvasProps.width,
    height: canvasProps.height,
    transparent: true,
    antialias: true,
    preserveDrawingBuffer: true
  });

  onMount(() => {
    canvasRoot.appendChild(app.view);
    loadWebfonts();
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
  bg.beginFill(PIXI.utils.string2hex($bgColor));
  bg.drawRoundedRect(0, 0, canvasProps.width, canvasProps.height, bgRadius);
  bg.endFill();
  container.addChild(bg);

  const style = new PIXI.TextStyle({
    fontFamily: $fontFamily,
    fontSize: $fontSize,
    fill: $fontColor,
    wordWrap: true,
    wordWrapWidth: canvasProps.width - canvasProps.padding * 2,
    // fontWeight: 'bold',
    align: 'center'
  });

  const updateCanvas = debounce(() => {
    app.render();
    dataUrl = app.view.toDataURL('image/png');
  }, 25);

  updateCanvas();

  const initText = () => {
    basicText = new PIXI.Text(text, style);
    basicText.zIndex = 10;
    basicText.x = canvasProps.width / 2;
    basicText.y = canvasProps.height / 2;
    basicText.anchor.set(0.5);
    container.addChild(basicText);
    updateText();
  };

  const updateText = () => {
    basicText.text = $text;
    updateCanvas();
  };

  const updateBgColor = () => {
    bg.clear();
    bg.beginFill(PIXI.utils.string2hex($bgColor));
    bg.drawRoundedRect(0, 0, canvasProps.width, canvasProps.height, bgRadius);
    bg.endFill();
    container.addChild(bg);
    updateCanvas();
  };

  const updateFontColor = () => {
    style.fill = $fontColor;
    updateCanvas();
  };

  const updateFontFamily = () => {
    style.fontFamily = $fontFamily;
    updateCanvas();
  };

  const updateFontSize = () => {
    style.fontSize = $fontSize;
    updateCanvas();
  };

  const download = () => {
    app.view.toBlob(blob =>
      saveAs(blob, `textmoji-${sanitizeFilename($text)}.png`)
    );
  };
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
    <input bind:value={$text} on:input={updateText} type="text" />
  </div>
  <div>
    <input
      bind:value={$fontColor}
      on:change={updateFontColor}
      on:input={updateFontColor}
      type="color" />
    <input
      bind:value={$bgColor}
      on:change={updateBgColor}
      on:input={updateBgColor}
      type="color" />
  </div>
  <div>
    <select bind:value={$fontFamily} on:change={updateFontFamily}>
      {#each fonts as font}
        <option value={font}>{font}</option>
      {/each}
    </select>
  </div>
  <div>
    <input
      bind:value={$fontSize}
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
