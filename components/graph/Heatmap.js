import React from "react";
import CalendarHeatmap from "react-calendar-heatmap";
import ReactTooltip from "react-tooltip";
import "react-calendar-heatmap/dist/styles.css";

export default function App({
  data,
  year = new Date().getFullYear(),
  startDate,
  endDate,
}) {
  return (
    <div>
      <CalendarHeatmap
        startDate={startDate || new Date(`${year}-01-01`)}
        endDate={endDate || new Date(`${year}-12-31`)}
        values={data || []}
        classForValue={(value) => {
          if (!value) {
            return "color-empty";
          }
          return `color-gitlab-${value.count > 4 ? 4 : value.count}`;
        }}
        tooltipDataAttrs={(value) => {
          const date = new Date(value.date);
          if (value.count) {
            const message = `${value.count} visits on ${date.toDateString()}`;
            return {
              "data-tip": message,
            };
          } else {
            const message = `No visits`;
            return {
              "data-tip": message,
            };
          }
        }}
        showWeekdayLabels={true}
        gutterSize={5}
        // showOutOfRangeDays = {true}
      />
      <ReactTooltip />
    </div>
  );
}

