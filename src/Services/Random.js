class Random {
  static integer = (min, max) =>
    Math.floor(Math.random() * (max - min + 1) + min)

  static boolean = () => Math.random() - 0.5
}

export default Random
