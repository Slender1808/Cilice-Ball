class Screen {
  constructor() {
    ratio: 8;
  }

  gcd(a, b) {
    return 0 === b ? a : this.gcd(b, a % b);
  }

  prefix() {
    if (window.matchMedia)
      for (
        var prefixes =
            "-webkit-min- min--moz- -o-min- -ms-min- -khtml-min- ".split(" "),
          i = 0;
        i < prefixes.length;
        i++
      )
        if (
          window.matchMedia("(" + prefixes[i] + "device-pixel-ratio:1.0)")
            .matches
        )
          return prefixes[i];
  }
  dppx() {
    if (window.matchMedia) {
      for (
        var i = 1, maxdppx = 1;
        i <= this.ratio &&
        !1 !==
          window.matchMedia("(min-resolution:" + i.toFixed(1) + "dppx)")
            .matches;
        i = parseFloat((i + 0.1).toFixed(1))
      )
        maxdppx = i;
      return maxdppx;
    }
  }
  devicePixelRatio() {
    if (this.prefix) {
      for (
        var i = 1, maxdpr = 1;
        i <= this.ratio &&
        !1 !==
          window.matchMedia(
            "(" + this.prefix + "device-pixel-ratio:" + i.toFixed(1) + ")"
          ).matches;
        i = parseFloat((i + 0.1).toFixed(1))
      )
        maxdpr = i;
      return maxdpr;
    }
  }

  load() {
    const ratio = this.gcd(window.screen.width, window.screen.height);
    return {
      hardwareConcurrency: window.navigator.hardwareConcurrency,
      downlink: window.navigator.connection.downlink,
      userAgent: window.navigator.userAgent,
      languages: window.navigator.languages,
      deviceMemory: window.navigator.deviceMemory,
      width: window.screen.width,
      height: window.screen.height,
      availWidth: window.screen.availWidth,
      colorDepth: window.screen.colorDepth,
      pixelDepth: window.screen.pixelDepth,
      availHeight: window.screen.availHeight,
      availTop: window.screen.availTop,
      availLeft: window.screen.availLeft,
      devicePixelRatio: window.devicePixelRatio,
      aspectRatio:
        window.screen.width / ratio + ":" + window.screen.height / ratio,
      orientationType: window.screen.orientation.type,
      orientationType2: window.screen.orientation.type.split("-")[0],
      maxTouchPoints: window.navigator.maxTouchPoints,
      angle: window.screen.orientation.angle,
      resolution:
        Math.round(
          window.screen.width * parseFloat(window.devicePixelRatio.toFixed(1))
        ) +
        " ⨯ " +
        Math.round(
          window.screen.height * parseFloat(window.devicePixelRatio.toFixed(1))
        ),
      innerWidth: window.innerWidth,
      outerWidth: window.outerWidth,
      innerHeight: window.innerHeight,
      outerHeight: window.outerHeight,
      bodyClientWidth: document.body.clientWidth,
      bodyCientHeight: document.body.clientHeight,
      bodyClientTop: document.body.clientTop,
      bodyClientLeft: document.body.clientLeft,
      clientWidth: document.documentElement.clientWidth,
      clientHeight: document.documentElement.clientHeight,
      clientTop: document.documentElement.clientTop,
      clientLeft: document.documentElement.clientLeft,
      viewportWidth: Math.max(
        document.documentElement.clientWidth || 0,
        window.innerWidth || 0
      ),
      viewportHeight: Math.max(
        document.documentElement.clientHeight || 0,
        window.innerHeight || 0
      ),
      detectorPrefix: this.prefix(),
      detectorDPI: Math.round(96 * this.dppx()),
      detectorDPRDetected: this.devicePixelRatio(),
      detectorDppx: Math.round(parseFloat(this.dppx().toFixed(1))),
      zoomLevel: Math.round(
        100 * parseFloat(window.devicePixelRatio.toFixed(1))
      ),
      detectorDPRWindow: parseFloat(window.devicePixelRatio.toFixed(1)),
    };
  }
}

export default Screen;
