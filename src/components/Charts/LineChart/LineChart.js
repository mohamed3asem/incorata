import React, { useRef, useLayoutEffect } from 'react';

// import * as am4core from "@amcharts/amcharts4/core";
// import * as am4charts from "@amcharts/amcharts4/charts";
import './LineChart.css';
import ErrorBoundry from 'src/components/ErrorBounderies/ErrorBoundary';

export const LineChart = ({
  id = 'lineChartdiv',
  chartData = [],
  measures,
  dimension,
}) => {
  const nChart = useRef(null);

  useLayoutEffect(() => {
    let chart;

    const createChart = async () => {
      try {
        const modules = await Promise.all([
          import('@amcharts/amcharts4/core'),
          import('@amcharts/amcharts4/charts'),
        ]);
        const am4core = modules[0];
        const am4charts = modules[1];

        chart = am4core.create(id, am4charts.XYChart);

        chart.data = chartData;

        // Create category axis
        let categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
        categoryAxis.dataFields.category = 'dimension';
        categoryAxis.renderer.grid.template.disabled = true;
        categoryAxis.title.text = dimension;
        categoryAxis.renderer.minGridDistance = 30;

        // label if x axis
        let labelx = categoryAxis.renderer.labels.template;
        if (chartData.length > 7) {
          labelx.maxWidth = 60;
          labelx.truncate = true;
        } else {
          labelx.wrap = true;
          labelx.maxWidth = 120;
        }

        // Add chart cursor
        chart.cursor = new am4charts.XYCursor();

        // Scrollbars
        chart.scrollbarX = new am4core.Scrollbar();
        chart.scrollbarY = new am4core.Scrollbar();

        // markerTemplate.dx = 50

        function createAxisAndSeries(field, name, opposite, bullet) {
          var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
          valueAxis.title.text = name;
          if (chart.yAxes.indexOf(valueAxis) !== 0) {
            valueAxis.syncWithAxis = chart.yAxes.getIndex(0);
          }

          var series = chart.series.push(new am4charts.LineSeries());
          series.dataFields.valueY = field;
          series.dataFields.categoryX = 'dimension';
          series.strokeWidth = 2;
          series.yAxis = valueAxis;
          series.name = name;
          series.tooltipText = '{name}: [bold]{valueY}[/]';
          series.tensionX = 0.8;
          series.showOnInit = true;

          let interfaceColors = new am4core.InterfaceColorSet();

          switch (bullet) {
            case 'triangle':
              bullet = series.bullets.push(new am4charts.Bullet());
              bullet.width = 12;
              bullet.height = 12;
              bullet.horizontalCenter = 'middle';
              bullet.verticalCenter = 'middle';

              let triangle = bullet.createChild(am4core.Triangle);
              triangle.stroke = interfaceColors.getFor('background');
              triangle.strokeWidth = 2;
              triangle.direction = 'top';
              triangle.width = 12;
              triangle.height = 12;
              break;
            case 'rectangle':
              bullet = series.bullets.push(new am4charts.Bullet());
              bullet.width = 10;
              bullet.height = 10;
              bullet.horizontalCenter = 'middle';
              bullet.verticalCenter = 'middle';

              let rectangle = bullet.createChild(am4core.Rectangle);
              rectangle.stroke = interfaceColors.getFor('background');
              rectangle.strokeWidth = 2;
              rectangle.width = 10;
              rectangle.height = 10;
              break;
            default:
              bullet = series.bullets.push(new am4charts.CircleBullet());
              bullet.circle.stroke = interfaceColors.getFor('background');
              bullet.circle.strokeWidth = 2;
              break;
          }

          valueAxis.renderer.line.strokeOpacity = 1;
          valueAxis.renderer.line.strokeWidth = 2;
          valueAxis.renderer.line.stroke = series.stroke;
          valueAxis.renderer.labels.template.fill = series.stroke;
          valueAxis.renderer.opposite = opposite;
        }

        let keys = Object.keys(chartData[0]);

        keys?.forEach((key) => {
          if (key === 'dimension') return;
          let shape =
            key === 'Cost'
              ? 'triangle'
              : key === 'Revenue'
              ? 'rectangle'
              : 'circle';
          createAxisAndSeries(key, key, false, shape);
        });

        nChart.current = chart;
      } catch (e) {
        console.log(e);
      }
    };

    createChart();

    return () => {
      chart?.dispose();
    };
  }, [id, chartData, measures, dimension]);

  return (
    <ErrorBoundry>
      <div id={id} ref={nChart} className="lineChart"></div>
    </ErrorBoundry>
  );
};
