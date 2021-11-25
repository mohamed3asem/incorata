import React, { useRef, useLayoutEffect } from 'react';

// import * as am4core from "@amcharts/amcharts4/core";
// import * as am4charts from "@amcharts/amcharts4/charts";

export const LineChart = ({ id = 'lineChartdiv' }) => {
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

      // var chart = am4core.create(id, am4charts.RadarChart);
      var chart = am4core.create(id, am4charts.XYChart);

      // Add data
      chart.data = [
        {
          date: new Date(2021, 1, 1),
          value1: 50,
          value2: 48,
        },
        {
          date: new Date(2021, 2, 1),
          value1: 33,
          value2: 48,
        },
        {
          date: new Date(2021, 3, 1),
          value1: 25,
          value2: 48,
        },
        {
          date: new Date(2021, 4, 1),
          value1: 50,
          value2: 48,
        },
        {
          date: new Date(2021, 5, 1),
          value1: 53,
          value2: 51,
        },
        {
          date: new Date(2021, 6, 1),
          value1: 56,
          value2: 58,
        },
        {
          date: new Date(2021, 7, 1),
          value1: 52,
          value2: 53,
        },
        {
          date: new Date(2021, 8, 1),
          value1: 48,
          value2: 44,
        },
        {
          date: new Date(2021, 9, 1),
          value1: 47,
          value2: 42,
        },
        {
          date: new Date(2021, 10, 1),
          value1: 59,
          value2: 55,
        },
        {
          date: new Date(2021, 11, 1),
          value1: 11,
          value2: 48,
        },
      ];

      // Create axes
      var dateAxis = chart.xAxes.push(new am4charts.DateAxis());
      dateAxis.renderer.minGridDistance = 10;
      dateAxis.renderer.grid.template.disabled = true;
      dateAxis.renderer.labels.template.fontSize = '1.4rem';
      dateAxis.title.text = 'Local country offices';

      var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
      valueAxis.renderer.labels.template.fontSize = '1.4rem';
      valueAxis.title.text = 'Local country offices';
      // valueAxis.renderer.grid.template.disabled = true;

      // Create series
      // var series = chart.series.push(new am4charts.LineSeries());
      // series.dataFields.valueY = 'value1';
      // series.dataFields.dateX = 'date';
      // series.strokeWidth = 2;
      // series.minBulletDistance = 10;
      // series.tooltipText = '[bold]{date.formatDate()}:[/] {value1}';
      // series.tooltip.pointerOrientation = 'vertical';

      const createSeries = (n) => {
        var series = chart.series.push(new am4charts.LineSeries());
        series.dataFields.valueY = 'value' + n;
        series.dataFields.dateX = 'date';
        series.strokeWidth = 2;
        series.minBulletDistance = 10;
        series.tooltipText = `[bold]{date.formatDate()}:[/] {value${n}}`;
        series.tooltip.pointerOrientation = 'vertical';
        //   series.fill = 'red';
        //   series.stroke = am4core.color('red');
        series.bullets.push(new am4charts.CircleBullet());
      };
      // Create series

      [1, 2, 3, 4].forEach((n) => {
        createSeries(n);
      });
      // var series3 = chart.series.push(new am4charts.LineSeries());
      // series3.dataFields.valueY = 'value3';
      // series3.dataFields.dateX = 'date';
      // series3.strokeWidth = 2;

      // var series4 = chart.series.push(new am4charts.LineSeries());
      // series4.dataFields.valueY = 'value4';
      // series4.dataFields.dateX = 'date';
      // series4.strokeWidth = 2;
      // series2.strokeDasharray = "3,4";
      // series2.stroke = series.stroke;

      // Add cursor
      chart.cursor = new am4charts.XYCursor();
      chart.cursor.xAxis = dateAxis;
      // Add cursor
      // chart.cursor = new am4charts.RadarCursor();

      // markerTemplate.dx = 50
      nChart.current = chart;
    };

    createChart();
    return () => {
      // console.log("pie chart disposed");
      chart?.dispose();
    };
    // Chart code goes here
  }, [id]);
  return (
    <div id={id} ref={nChart} style={{ width: '80%', height: '70%' }}></div>
  );
};
