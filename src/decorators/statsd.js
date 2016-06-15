import StatsD from "node-statsd";

export default function statsD(stat = "", client = new StatsD()) {
  return function decorator(target, name, descriptor) {
    const fn = descriptor.value;

    const wrapper = function wrapper(...args) {
      const now = new Date();
      const promise = fn.apply(this, args);
      const statistic = (stat || this.name || "").toLowerCase();

      promise.then(() => {
        const after = new Date();
        const duration = after - now;

        if (duration > 0) {
          client.timing(`open_planet.nodejs.${statistic}.get.success.response_time`, duration);
          client.increment(`open_planet.nodejs.${statistic}.get.success.count`);
        }
      })
      .catch(() => {
        client.increment(`open_planet.nodejs.${statistic}.get.fail.count`);
      });

      return promise;
    };

    descriptor.value = wrapper;
  };
}
