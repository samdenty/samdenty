import * as React from "react";
import styled from "@emotion/styled";
import debounce from "debounce";
import * as Comlink from "comlink";

export const StyledCanvas = styled.canvas<{ loaded: boolean }>`
  transition: opacity 2s ease, transform 4s ease;
  opacity: ${({ loaded }) => (loaded ? 1 : 0)};
  transform: ${({ loaded }) => (loaded ? "none" : "scale(1.3)")};
  position: fixed;
  z-index: -1;
`;

export const BackgroundEffectContext = React.createContext([false, () => {}]);

export const BackgroundEffect = () => {
  const [paused] = React.useContext(BackgroundEffectContext);
  const [loaded, setLoaded] = React.useState(false);
  const canvasRef = React.useRef<any>(null);

  const EffectRenderer = React.useMemo(
    (): any =>
      typeof window !== "undefined" &&
      Comlink.wrap(
        new Worker(new URL("../EffectRenderer.js", import.meta.url), {
          type: "module",
        })
      ),
    []
  );

  const effectRef = React.useRef<any>(null);

  React.useLayoutEffect(() => {
    if (!canvasRef.current) return;

    const dispose = (async () => {
      const canvas = canvasRef.current!;
      canvasRef.current = undefined;

      const offscreen = canvas.transferControlToOffscreen();

      const effect = await new EffectRenderer(
        Comlink.transfer(offscreen, [offscreen])
      );

      effectRef.current = effect;

      async function calculate() {
        const width = window.innerWidth;
        const height = window.innerHeight;

        await effect.calculate(width, height, devicePixelRatio);

        canvas.style.width = `${width}px`;
        canvas.style.height = `${height}px`;
      }

      await calculate();
      effect.draw().then(() => setLoaded(true));

      const callback = debounce(calculate, 200);
      window.addEventListener("resize", callback);

      return () => {
        effect.stop();
        window.removeEventListener("resize", callback);
      };
    })();

    return () => {
      dispose.then((dispose) => dispose());
    };
  }, []);

  React.useEffect(() => {
    if (!loaded) return;
    effectRef.current!.stop();

    if (paused) {
      effectRef.current!.stop();
    } else {
      effectRef.current!.start();
    }
  }, [effectRef.current, loaded, paused]);

  return <StyledCanvas loaded={loaded} ref={canvasRef} />;
};
