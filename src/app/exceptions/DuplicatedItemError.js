export default class DuplicatedItemError extends Error {
  constructor(message) {
    super(message);

    this.name = this.constructor.name;
  }
}
