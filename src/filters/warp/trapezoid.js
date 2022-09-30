import {warpShader} from '../common'
import {simpleShader} from '../../util'
import * as store from '../../store'

/**
 * @filter                Trapezoid
 * @description           Warps an image by a trapezoid.
 * @param moveX           The amount to move the image horizontally.
 */
export default function(moveX) {
  var gl = store.get('gl');
  gl.trapezoid = gl.trapezoid || warpShader('\
    uniform float moveX;\
  ', '\
    coord = coord / texSize * 2.0 - 1.0;\
    coord.x = coord.x / mix(moveX, 1.0, (coord.y + 1.0) / 2.0);\
    coord = (coord * 0.5 + 0.5) * texSize;\
  ');

  simpleShader.call(this, gl.trapezoid, {
    moveX,
    texSize: [this.width, this.height]
  });

  return this;
}
