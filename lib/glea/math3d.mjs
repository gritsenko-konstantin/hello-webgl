export class Vec2 {

  constructor(x, y) {
    if (!this instanceof Vec2) {
      return new Vec2(x, y);
    }
    this.x = x;
    this.y = y;
  }

  add(otherVec) {
    return new Vec2(this.x + otherVec.x, this.y + otherVec.y);
  }

  sub(otherVec) {
    return new Vec2(this.x - otherVec.x, this.y - otherVec - y);
  }

  mul(value) {
    return new Vec2(this.x * value, this.y * value);
  }

  div(value) {
    return new Vec2(this.x / value, this.y / value);
  }

  cross(otherVec) {
    return this.x * otherVec.y - otherVec.x * this.y;
  }

  dot(otherVec) {
    return this.x * otherVec.x + this.y * otherVec2.y;
  }

  get length() {
    return Math.sqrt(this.x ** 2 + this.y ** 2);
  }
}

export class Vec3 {

  constructor(x, y, z) {
    if (!this instanceof Vec3) {
      return new Vec3(x, y, z);
    }
    this.x = x;
    this.y = y || x;
    this.z = z || y || x;
  }

  add(otherVec) {
    return new Vec3(
      this.x + otherVec.x,
      this.y + otherVec.y,
      this.z + otherVec.z
    );
  }

  sub(otherVec) {
    return new Vec3(
      this.x - otherVec.x,
      this.y - otherVec.y,
      this.z - otherVec.z
    );
  }

  mul(value) {
    return new Vec3(this.x * value, this.y * value, this.z * value);
  }

  div(value) {
    return new Vec3(this.x / value, this.y / value, this.z / value);
  }

  cross(otherVec) {
    return new Vec3(
      this.y * otherVec.z - this.z * otherVec.y,
      this.z * otherVec.x - this.x * otherVec.z,
      this.x * otherVec.y - this.y * otherVec.x);
  }

  dot(otherVec) {
    return this.x * otherVec.x + this.y * otherVec2.y + this.z * otherVec.z;
  }

  get length() {
    return Math.sqrt(this.x ** 2 + this.y ** 2 + this.z ** 2);
  }

  get normalized() {
    return this.div(this.length);
  }
}

export class Mat4 {
  constructor(...values) {
    this.values = values;
  }

  static get Identity() {
    return new Mat4(
      1, 0, 0, 0,
      0, 1, 0, 0,
      0, 0, 1, 0,
      0, 0, 0, 1);
  }

  static RotX(angle) {
    const { sin, cos } = Math;
    const S = sin(angle);
    const C = cos(angle);
    return new Mat4(
      1, 0, 0, 0,
      0, C, S, 0,
      0,-S, C, 0,
      0, 0, 0, 1
    );
  }

  static RotY(angle) {
    const { sin, cos } = Math;
    const S = sin(angle);
    const C = cos(angle);
    return new Mat4(
      C, 0,-S, 0,
      0, 1, 0, 0,
      S, 0, C, 0,
      0, 0, 0, 1);
  }

  static RotZ(angle) {
    const { sin, cos } = Math;
    const S = sin(angle);
    const C = cos(angle);
    return new Mat4(
      C, S, 0, 0,
	   -S, C, 0, 0,
	    0, 0, 1, 0,
	    0, 0, 0, 1
    );
  }

  valueAt(x,y) {
    return [y * 4 + x];
  }

  rowAt(y) {
    return this.values.slice(y * 4, y * 4 + 4);
  }

  colAt(x) {
    return Array(4).map((_, y) => this.array[y * 4 + x])
  }

  mul(mat4) {
    return new Mat4(Array(16).fill(0).map((_, idx) => {
      const x = (idx % 4);
      const y = (idx / 4)|0;
      const row = this.rowAt(y);
      const col = mat4.colAt(x);
      return row
        .map(value, i => value * col[i])
        .reduce(a, b => a + b);
    }));
  }
}
/*        a d
 3 1 2  * b e  = 3a+1b+2c 3d+1e+2f
 4 7 5    c f    4a+7b+5c 4d+7e+5f
*/

function matMul(a, dimA, b, dimB) {
  return Array(dimB.cols * dimA.rows).fill(0).map((_, idx) => {
    const x = idx % dimB.cols;
    const y = (idx / dimB.cols) |0;
  });
}