import React from "react";
import * as Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { useEvent } from "../context/EventContext";
import HighchartsExporting from "highcharts/modules/exporting";
import { EventType } from "../types/EventType";

if (typeof Highcharts === "object") {
  HighchartsExporting(Highcharts);
}

export default function HighCharts() {
  const { data } = useEvent();
  const [options, setOptions] = React.useState<Highcharts.Options>();

  React.useEffect(() => {
    const events = data ? data.events : [];
    const optionsData: Highcharts.Options = {
      chart: {
        type: "scatter",
        zoomType: "xy",
      },
      title: {
        text: "Event chart",
      },
      subtitle: {
        text: "Source: Fake QL Server",
      },
      xAxis: {
        title: {
          text: "Time (mm/dd/yyyy)",
        },
        labels: {
          formatter: (ctx: Highcharts.AxisLabelsFormatterContextObject) => {
            return new Date(ctx.value).toLocaleDateString();
          },
        },
        startOnTick: true,
        endOnTick: true,
        showLastLabel: true,
      },
      yAxis: {
        title: {
          text: "Value",
        },
      },
      legend: {
        layout: "vertical",
        align: "left",
        verticalAlign: "top",
        x: 100,
        y: 70,
        floating: true,
        backgroundColor:
          Highcharts &&
          Highcharts.defaultOptions &&
          Highcharts.defaultOptions.chart
            ? Highcharts.defaultOptions.chart.backgroundColor
            : "",
        borderWidth: 1,
      },
      plotOptions: {
        scatter: {
          marker: {
            radius: 5,
            states: {
              hover: {
                enabled: true,
                lineColor: "rgb(100,100,100)",
              },
            },
          },
          states: {
            hover: {
              enabled: false,
            },
          },
          tooltip: {
            headerFormat: "<b>{series.name}</b><br>",

            pointFormatter: function () {
              return (
                events[this.index].title +
                " <br/> " +
                new Date(this.x).toLocaleDateString() + 
                "<br/> value: " + 
                this.y
              );
            },
          },
        },
      },
      series: [
        {
          name: "Event",
          color: "rgba(119, 152, 191, .5)",
          type: "scatter",
          data: events.map((event: EventType) => {
            return [new Date(event.created_at).valueOf(), event.value];
          }),
        },
      ],
    };

    setOptions(optionsData);
  }, [data]);

  return (
    <div className="mt-3">
      <HighchartsReact highcharts={Highcharts} options={options} />
    </div>
  );
}
