import React, { useRef, useLayoutEffect } from 'react';

// import * as am4core from "@amcharts/amcharts4/core";
// import * as am4charts from "@amcharts/amcharts4/charts";
import './LineChart.css';

export const LineChart = ({
  id = 'lineChartdiv',
  chartData = [],
  measures,
  dimension,
}) => {
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
      categoryAxis.title.text = dimension;
      categoryAxis.renderer.minGridDistance = 30;

      // label if x axis
      var labelx = categoryAxis.renderer.labels.template;
      if (chartData.length > 7) {
        labelx.maxWidth = 60;
        labelx.truncate = true;
      } else {
        labelx.wrap = true;
        labelx.maxWidth = 120;
      }

      // Create value axis
      var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());

      valueAxis.title.text = measures[0];
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
  }, [id, chartData, measures, dimension]);
  return <div id={id} ref={nChart} className="lineChart"></div>;
};
