export default class InvalidArgumentsError extends Error {
  constructor(message) {
    super(message);

    this.name = this.constructor.name;
  }
}
