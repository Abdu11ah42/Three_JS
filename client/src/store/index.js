import { proxy } from "valtio";

const state = proxy({
  intro: true,
  color: "#EFBD48",
  isLogoTexture: true,
  isFullTexture: false,
  LogoPrice: 200,
  fulltexturePrice: 150,
  logoDecal: "./threejs.png",
  fullDecal: "./threejs.png",
});

export default state;
