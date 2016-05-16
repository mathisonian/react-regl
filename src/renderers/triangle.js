export default (regl) => {
  return regl({
    frag: `
      precision mediump float;
      uniform vec4 color;
      void main () {
        gl_FragColor = color;
      }
    `,
    vert: `
      precision mediump float;
      attribute vec2 position;
      void main () {
        gl_Position = vec4(position.x, position.y, 0, 1);
      }
    `,
    count: 3
  });
};
