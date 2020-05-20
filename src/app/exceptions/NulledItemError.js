export default class NulledItemError extends Error {
  constructor(message) {
    super(message);

    this.name = this.constructor.name;
  }
}
