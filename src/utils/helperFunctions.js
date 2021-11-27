export const formulateGraphData = (rawData, dimension) => {
  let dimensions = rawData.find(({ name }) => name === dimension);
  console.log(dimension);
  let chartData = [];
  dimensions.values.forEach((element) => {
    chartData.push({ dimension: element });
  });

  rawData.forEach(({ name, values }) => {
    name = name === 'Units sold' ? 'UnitsSold' : name;
    if (name === dimension) return;
    values.forEach((item, index) => {
      chartData[index][name] = +item.toFixed(1);
    });
  });
  return chartData;
};
