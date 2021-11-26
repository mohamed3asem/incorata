import React, { useRef, useLayoutEffect } from 'react';

// import * as am4core from "@amcharts/amcharts4/core";
// import * as am4charts from "@amcharts/amcharts4/charts";

const data = [
  {
    dimension: '1930',
    italy: 1,
    germany: 5,
    cost: 0,
  },
  {
    dimension: '1934',
    italy: 1,
    germany: 2,
    cost: 0,
  },
  {
    dimension: '1938',
    italy: 2,
    germany: 3,
    cost: 0,
  },
  {
    dimension: '1950',
    italy: 3,
    germany: 4,
    cost: 0,
  },
  {
    dimension: '1954',
    italy: 5,
    germany: 1,
    cost: 0,
  },
  {
    dimension: '1958',
    italy: 3,
    germany: 2,
    cost: 0,
  },
  {
    dimension: '1962',
    italy: 1,
    germany: 2,
    cost: 0,
  },
  {
    dimension: '1966',
    italy: 2,
    germany: 1,
    cost: 0,
  },
  {
    dimension: '1970',
    italy: 3,
    germany: 5,
    cost: 0,
  },
  {
    dimension: '1974',
    italy: 4,
    germany: 3,
    cost: 0,
  },
  {
    dimension: '1978',
    italy: 1,
    germany: 2,
    cost: 0,
  },
];

export const LineChart = ({ id = 'lineChartdiv', chartData }) => {
  // console.log(data);
  //   const classes = useStyles();
  const nChart = useRef(null);

  useLayoutEffect(() => {
    let chart;

    const createChart = async () => {
      const modules = await Promise.all([
        import('@amcharts/amcharts4/core'),
        import('@amcharts/amcharts4/charts'),
      ]);
      const am4core = modules[0];
      const am4charts = modules[1];

      var chart = am4core.create(id, am4charts.XYChart);

      chart.data = chartData;

      // Create category axis
      var categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
      categoryAxis.dataFields.category = 'dimension';
      categoryAxis.renderer.grid.template.disabled = true;
      categoryAxis.title.text = 'dimension';

      // Create value axis
      var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());

      valueAxis.title.text = 'measure';
      valueAxis.renderer.minLabelPosition = 0.01;

      let keys = Object.keys(chartData[0]);

      keys?.forEach((key) => {
        if (key === 'dimension') return;

        var series = chart.series.push(new am4charts.LineSeries());
        series.dataFields.valueY = key;
        series.dataFields.categoryX = 'dimension';
        series.name = key;
        series.bullets.push(new am4charts.CircleBullet());
        series.tooltipText = ' {name} - {categoryX}: {valueY}';
        series.legendSettings.valueText = '{valueY}';
      });
      // // Create series

      // Add chart cursor
      chart.cursor = new am4charts.XYCursor();
      // chart.cursor.behavior = "zoomY";

      // Scrollbars
      chart.scrollbarX = new am4core.Scrollbar();
      chart.scrollbarY = new am4core.Scrollbar();

      // markerTemplate.dx = 50
      nChart.current = chart;
    };

    createChart();
    return () => {
      // console.log("pie chart disposed");
      chart?.dispose();
    };
    // Chart code goes here
  }, [id, chartData]);
  return (
    <div id={id} ref={nChart} style={{ width: '100%', height: '70%' }}></div>
  );
};
