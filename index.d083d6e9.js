var e="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},r={},o={},n=e.parcelRequirea610;null==n&&((n=function(e){if(e in r)return r[e].exports;if(e in o){var n=o[e];delete o[e];var t={id:e,exports:{}};return r[e]=t,n.call(t.exports,t,t.exports),t.exports}var a=new Error("Cannot find module '"+e+"'");throw a.code="MODULE_NOT_FOUND",a}).register=function(e,r){o[e]=r},e.parcelRequirea610=n);var t=n("aEbkS");const a=["cat","dog","popular","fun","ukraine","lions","girls","horses","nature","space"];function i(){return min=0,max=Math.floor(a.length),Math.floor(Math.random()*(max-0+1))+0}const l=document.querySelectorAll("img");(0,t.searchImages)(a[i()],1,6,"vertical").then((({hits:e})=>{const r=[0,1,2,6,7,8];e.map((({webformatURL:e},o)=>l[r[o]].src=e));(0,t.searchImages)(a[i()],1,3,"horizontal").then((({hits:e})=>{const r=[3,4,5];e.map((({webformatURL:e},o)=>l[r[o]].src=e))}))}));
//# sourceMappingURL=index.d083d6e9.js.map
