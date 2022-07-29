import React, { useMemo, useState, useEffect, useCallback } from "react";
import { ParentSize } from "@visx/responsive";
import { Group } from "@visx/group";
import { scaleBand, scaleLinear } from "@visx/scale";
import { AxisLeft, AxisBottom } from "@visx/axis";
import { GridRows, GridColumns } from "@visx/grid";
import { Line, LinePath } from "@visx/shape";
import { extent, bisector } from "d3-array";
import { data } from "./data";
import { localPoint } from "@visx/event";
import { GlyphCircle } from "@visx/glyph";
import { useTooltip, TooltipWithBounds, defaultStyles } from "@visx/tooltip";

function LineChart({ data, width, height }) {
  const {
    tooltipData,
    tooltipLeft = 0,
    tooltipTop = 0,
    showTooltip,
    hideTooltip,
  } = useTooltip();

  const margin = { top: 35, bottom: 50, left: 60, right: 42 };
  const xMax = width - (margin.left + margin.right);
  const yMax = height - (margin.top + margin.bottom);

  const colors = ["#43b284", "#fab255"];
  const data1 = data.filter(function (el) {
    return el.type === "RENEWABLE";
  });
  const data2 = data.filter(function (el) {
    return el.type === "TOTAL";
  });
  const series = [data1, data2];

  const formatDate = (year) => year.toString();
  const getRD = (d) => d.amount;
  const getDate = (d) => d.year;
  const bisectDate = bisector((d) => d.year).left;

  const mainAxisScale = scaleLinear({
    range: [0, xMax],
    domain: extent(data, getDate),
    padding: 0.2,
    nice: true,
  });
  const crossAxisScale = scaleLinear({
    range: [yMax, 0],
    domain: extent(data, getRD),
    nice: true,
  });

  const tooltipStyles = {
    ...defaultStyles,
    backgroundColor: "whitesmoke",
    color: "#026ff0",
  };

  // get data from a year
  const getD = (year) => {
    const output = data.filter(function (el) {
      return el.year === year;
    });
    return output;
  };

  const handleTooltip = useCallback((event) => {
    const { x } = localPoint(event) || { x: 0 };
    const x0 = mainAxisScale.invert(x - margin.left); // get Date from the scale

    const index = bisectDate(data, x0, 1);
    const d0 = data[index - 1];
    const d1 = data[index];
    let d = d0;

    if (d1 && getDate(d1)) {
      d =
        x0.valueOf() - getDate(d0).valueOf() >
        getDate(d1).valueOf() - x0.valueOf()
          ? d1
          : d0;
    }
    showTooltip({
      tooltipData: getD(d.year),
      tooltipLeft: x,
      tooltipTop: crossAxisScale(getRD(d)),
    });
  });

  return (
    <div style={{ position: "relative" }}>
      <svg width={width} height={height} className="mx-auto">
        <rect width={width} height={height} fill="url(#teal)" rx={14} />
        <Group top={margin.top} left={margin.left}>
          <GridRows
            scale={crossAxisScale}
            width={xMax}
            height={yMax}
            stroke="#e0e0e090"
          />
          <GridColumns
            scale={mainAxisScale}
            width={xMax}
            height={yMax}
            stroke="#e0e0e090"
          />
          {/* <line x1={xMax} x2={xMax} y1={0} y2={yMax} stroke="#e0e0e090" />
          <line x1={0} x2={xMax} y1={yMax} y2={yMax} stroke="#e0e0e090" /> */}
          <AxisBottom
            top={yMax}
            scale={mainAxisScale}
            stroke="#00000060"
            hideTicks
            numTicks={5}
            label={"Year"}
            labelClassName="text-primary"
            tickFormat={formatDate}
            tickStroke={"#000"}
            tickTextFill={"#000"}
            tickLabelProps={() => ({
              fill: "#000",
              fontSize: 11,
              textAnchor: "middle",
            })}
          />
          <AxisLeft
            scale={crossAxisScale}
            stroke="#00000060"
            hideTicks
            numTicks={5}
            label={"Time in (Hours)"}
            tickTextFill={"#000"}
            tickStroke={"#000"}
            tickLabelProps={() => ({
              fill: "#000",
              fontSize: 11,
              textAnchor: "end",
            })}
          />
          {series.map((sData, i) => (
            <LinePath
              key={i}
              stroke={colors[i]}
              strokeWidth={3}
              data={sData}
              x={(d) => mainAxisScale(getDate(d)) ?? 0}
              y={(d) => crossAxisScale(getRD(d)) ?? 0}
            />
          ))}
          {tooltipData && (
            <g>
              <Line
                from={{ x: tooltipLeft - margin.left, y: 0 }}
                to={{ x: tooltipLeft - margin.left, y: innerHeight }}
                stroke={"#090a0a"}
                strokeWidth={2}
                pointerEvents="none"
                strokeDasharray="4,2"
              />
            </g>
          )}
          {tooltipData &&
            tooltipData.map((d, i) => (
              <g>
                <GlyphCircle
                  left={tooltipLeft - margin.left}
                  top={crossAxisScale(d.amount) + 2}
                  size={110}
                  fill={colors[i]}
                  stroke={"white"}
                  strokeWidth={2}
                />
              </g>
            ))}
          <rect
            x={0}
            y={0}
            width={xMax}
            height={yMax}
            onTouchStart={handleTooltip}
            fill={"transparent"}
            onTouchMove={handleTooltip}
            onMouseMove={handleTooltip}
            onMouseLeave={() => hideTooltip()}
          />
        </Group>
      </svg>
      {/* render a tooltip */}
      {tooltipData ? (
        <TooltipWithBounds
          key={Math.random()}
          top={tooltipTop}
          left={tooltipLeft}
          style={tooltipStyles}
        >
          <p>{`Total Spend: $${getRD(tooltipData[1])}`}</p>
          <p>{`Renewable Spend: $${getRD(tooltipData[0])}`}</p>
          <p>{`Year: ${getDate(tooltipData[1])}`}</p>
        </TooltipWithBounds>
      ) : null}
    </div>
  );
}

export default function LineGraph({ isFullScreen = false }) {
  return (
    <ParentSize>
      {({ width, height }) => (
        <LineChart
          data={data}
          width={width}
          height={isFullScreen ? height : 300}
        />
      )}
    </ParentSize>
  );
}
