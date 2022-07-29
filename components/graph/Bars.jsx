import React, { useMemo, useState, useEffect } from "react";
import { BarGroupHorizontal, BarGroup, Bar } from "@visx/shape";
import { Group } from "@visx/group";
import { AxisBottom, AxisLeft } from "@visx/axis";
import { GridRows, GridColumns } from "@visx/grid";
import { scaleBand, scaleLinear, scaleOrdinal } from "@visx/scale";
import { useSpring, animated } from "react-spring";
import { ParentSize } from "@visx/responsive";
import { useTooltip, Tooltip, defaultStyles } from "@visx/tooltip";
import { Text } from "@visx/text";

const margin = { top: 35, bottom: 50, left: 60, right: 42 };

let tooltipTimeout;

function BarGraph({
  width,
  height,
  events = false,
  isHorizontal = false,
  data,
  barKeys = ["label"],
  barColors = ["#026ff0"],
  mainAxisName,
  crossAxisName,
  updateTooltipData = (tooltipData, colors) => {
    <div style={{ color: "black" }}>
      {/* {tooltipData.key} &nbsp; */}
      <strong style={{ color: colors(tooltipData.key) }}>
        {tooltipData.value}
      </strong>
    </div>;
  },
}) {
  let getMainAxisData = (d) => d.label;

  let {
    tooltipOpen,
    tooltipLeft,
    tooltipTop,
    tooltipData,
    hideTooltip,
    showTooltip,
  } = useTooltip();

  const tooltipStyles = {
    ...defaultStyles,
    backgroundColor: "whitesmoke",
    color: "white",
    padding: "1rem",
  };

  // bounds
  const xMax = width - (margin.left + margin.right);
  const yMax = height - (margin.top + margin.bottom);

  const labelLengthMax = useMemo(
    () => Math.max(...data.map((d) => d.label.length)),
    [data]
  );

  const getMaxTime = () => {
    let maxTime = Math.max(
      ...data.map((d) => Math.max(...barKeys.map((key) => Number(d[key]))))
    );
    //calc based on minutes
    if (maxTime < 120) {
      return 120;
    } else if (maxTime < 5 * 60) {
      return 5 * 60;
    } else {
      return maxTime + maxTime * 0.1;
    }
  };

  // scales, memoize for performance
  const mainAxisScale = useMemo(
    () =>
      scaleBand({
        domain: data.map(getMainAxisData),
        padding: 0.2,
      }),
    [xMax, yMax, data]
  );

  const crossAxisScale = useMemo(
    () =>
      scaleLinear({
        // domain: [0, Math.max(...data.map(getCrossAxisData))],
        domain: [0, getMaxTime()],
        padding: 0,
      }),

    [barKeys, data]
  );

  const singleMainAxisScale = useMemo(
    () =>
      scaleBand({
        padding: 0.1,
        domain: barKeys,
      }),
    [barKeys]
  );

  if (isHorizontal) {
    mainAxisScale.rangeRound([0, yMax]);
    singleMainAxisScale.rangeRound([0, mainAxisScale.bandwidth()]);
    // singleMainAxisScale.rangeRound([0, 20]);
    crossAxisScale.rangeRound([0, xMax]);
  } else {
    mainAxisScale.rangeRound([0, xMax]);
    singleMainAxisScale.rangeRound([0, mainAxisScale.bandwidth()]);
    // singleMainAxisScale.rangeRound([0, 20]);
    crossAxisScale.range([yMax, 0]);
  }

  const colorScale = scaleOrdinal({
    domain: barKeys,
    range: barColors,
  });

  const { scale } = useSpring({
    from: { scale: 0 },
    to: { scale: 1 },
  });

  const AnimatedBar = animated(Bar);

  let drawBars = (bars, group) => {
    let groupIndex = group.index;
    return bars.map((bar) => {
      return (
        <AnimatedBar
          key={`bar-group-bar-${groupIndex}-${bar.index}-${bar.value}-${bar.key}`}
          x={bar.x}
          y={bar.y}
          width={bar.width}
          height={bar.height}
          // y={scale.interpolate((s) => s * bar.y)}
          // height={scale.interpolate((s) => s * bar.height)}
          fill={bar.color}
          // rx={4}
          onClick={() => {
            if (!events) return;
            const { key, value } = bar;
            alert(JSON.stringify({ key, value }));
          }}
          onMouseLeave={() => {
            tooltipTimeout = window.setTimeout(() => {
              hideTooltip();
            }, 300);
          }}
          onMouseMove={() => {
            if (tooltipTimeout) clearTimeout(tooltipTimeout);
            const VerticalTop = bar.y + margin.top;
            const HorizontalTop = bar.y + group.y0 + margin.top - bar.height;
            const VerticalLeft = bar.x + group.x0 + bar.width / 2 + margin.left;
            const HorizontalLeft = bar.x + bar.width + margin.left;
            showTooltip({
              tooltipData: bar,
              tooltipTop: isHorizontal ? HorizontalTop : VerticalTop,
              tooltipLeft: isHorizontal ? HorizontalLeft : VerticalLeft,
            });
          }}
        />
      );
    });
  };

  return (
    <>
      <svg
        width={isHorizontal ? width - labelLengthMax * 3 : width}
        height={height}
        className="mx-auto"
      >
        {/* <GradientTealBlue id="teal" /> */}
        <rect
          width={isHorizontal ? width - labelLengthMax * 3 : width}
          height={height}
          fill="url(#teal)"
          rx={14}
        />
        <Group
          top={margin.top}
          left={isHorizontal ? margin.left + labelLengthMax * 3 : margin.left}
        >
          <GridRows
            scale={isHorizontal ? mainAxisScale : crossAxisScale}
            width={xMax}
            height={yMax}
            stroke="#e0e0e090"
          />
          <GridColumns
            scale={isHorizontal ? crossAxisScale : mainAxisScale}
            width={xMax}
            height={yMax}
            stroke="#e0e0e090"
          />
          <line x1={xMax} x2={xMax} y1={0} y2={yMax} stroke="#e0e0e090" />
          <line x1={0} x2={xMax} y1={yMax} y2={yMax} stroke="#e0e0e090" />
          <AxisBottom
            top={yMax}
            scale={isHorizontal ? crossAxisScale : mainAxisScale}
            stroke="#00000060"
            hideTicks
            label={isHorizontal ? mainAxisName : ""}
            labelClassName="text-primary"
            tickComponent={(tickRendererProps) => {
              if (isHorizontal) {
                let minutes = +tickRendererProps.formattedValue;
                let isHour = minutes % 60 === 0;
                return (
                  <Text
                    x={tickRendererProps.x}
                    y={tickRendererProps.y}
                    fontSize={10}
                  >
                    {isHour ? minutes / 60 : ""}
                  </Text>
                );
              } else {
                return (
                  <Text
                    x={
                      tickRendererProps.x -
                      tickRendererProps.formattedValue.length * 2.5
                    }
                    y={tickRendererProps.y}
                    // angle={270}
                    fontSize={10}
                    textAnchor="start"
                    labelProps=""
                  >
                    {Number(tickRendererProps.formattedValue)
                      ? ""
                      : tickRendererProps.formattedValue}
                  </Text>
                );
              }
            }}
          />
          <AxisLeft
            scale={isHorizontal ? mainAxisScale : crossAxisScale}
            stroke="#00000060"
            hideTicks
            numTicks={data.length}
            label={isHorizontal ? "" : mainAxisName}
            // numTicks={width > 520 ? 10 : 5}
            tickComponent={(tickRendererProps) => {
              if (!isHorizontal) {
                let minutes = +tickRendererProps.formattedValue.replace(
                  ",",
                  ""
                );
                let isHour = minutes % 60 === 0;
                return (
                  <Text
                    x={tickRendererProps.x - 10}
                    y={tickRendererProps.y}
                    fontSize={10}
                  >
                    {isHour ? minutes / 60 : ""}
                  </Text>
                );
              } else {
                return (
                  <Text
                    x={tickRendererProps.x - labelLengthMax * 6}
                    y={tickRendererProps.y}
                    fontSize={10}
                  >
                    {Number(tickRendererProps.formattedValue)
                      ? ""
                      : tickRendererProps.formattedValue}
                  </Text>
                );
              }
            }}
          />

          {!isHorizontal && (
            <BarGroup
              data={data}
              keys={barKeys}
              height={yMax}
              x0={getMainAxisData}
              x0Scale={mainAxisScale}
              x1Scale={singleMainAxisScale}
              yScale={crossAxisScale}
              color={colorScale}
            >
              {(barGroups) =>
                barGroups.map((barGroup) => (
                  <Group
                    key={`bar-group-${barGroup.index}-${barGroup.x0}`}
                    left={barGroup.x0}
                  >
                    {drawBars(barGroup.bars, barGroup)}
                  </Group>
                ))
              }
            </BarGroup>
          )}

          {isHorizontal && (
            <BarGroupHorizontal
              data={data}
              keys={barKeys}
              width={xMax}
              y0={getMainAxisData}
              y0Scale={mainAxisScale}
              y1Scale={singleMainAxisScale}
              xScale={crossAxisScale}
              color={colorScale}
            >
              {(barGroups) =>
                barGroups.map((barGroup) => (
                  <Group
                    key={`bar-group-horizontal-${barGroup.index}-${barGroup.y0}`}
                    top={barGroup.y0}
                  >
                    {drawBars(barGroup.bars, barGroup)}
                  </Group>
                ))
              }
            </BarGroupHorizontal>
          )}
        </Group>
      </svg>
      {tooltipOpen && tooltipData && (
        <Tooltip top={tooltipTop} left={tooltipLeft} style={tooltipStyles}>
          {updateTooltipData(tooltipData, colorScale)}
        </Tooltip>
      )}
    </>
  );
}

export default function ResponsiveBar({
  data,
  barKeys,
  barColors,
  isHorizontal,
  updateTooltipData,
  mainAxisName = "",
  crossAxisName = "",
  scrollable = false,
  scrollAxis = "x",
  x = 50,
  y = 50,
}) {
  let ScaleSize = 50;
  return (
    <ParentSize>
      {({ width, height }) => {
        return (
          <BarGraph
            width={
              scrollable &&
              (scrollAxis === "X" ||
                scrollAxis === "x" ||
                scrollAxis === "both")
                ? x * ScaleSize
                : width || height
            }
            height={
              scrollable &&
              (scrollAxis === "Y" ||
                scrollAxis === "y" ||
                scrollAxis === "both")
                ? y * ScaleSize
                : width * 0.6
            }
            isHorizontal={isHorizontal}
            data={data}
            barKeys={barKeys}
            barColors={barColors}
            updateTooltipData={updateTooltipData}
            mainAxisName={mainAxisName}
            crossAxisName={crossAxisName}
          />
        );
      }}
    </ParentSize>
  );
}
