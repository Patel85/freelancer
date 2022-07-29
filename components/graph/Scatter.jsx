import React, { useMemo, useState, useCallback, useRef } from "react";
import { Group } from "@visx/group";
import { Circle } from "@visx/shape";
import { AxisBottom, AxisLeft } from "@visx/axis";
import { GridRows, GridColumns } from "@visx/grid";
import { scaleLinear } from "@visx/scale";
import { withTooltip, Tooltip } from "@visx/tooltip";
import { voronoi, VoronoiPolygon } from "@visx/voronoi";
import { localPoint } from "@visx/event";
import { ParentSize } from "@visx/responsive";


const verticalMargin = 120;
const HorizontalMargin = 120;

const x = (d) => d.x;
const y = (d) => d.y;

let tooltipTimeout;

let ScatterGraph = withTooltip(
  ({
    width,
    height,
    showControls = true,
    hideTooltip,
    showTooltip,
    tooltipOpen = true,
    tooltipData,
    tooltipLeft,
    tooltipTop,
    points,
  }) => {
    if (width < 10) return null;

    // bounds
    const xMax = width - HorizontalMargin;
    const yMax = height - verticalMargin;

    const [showVoronoi, setShowVoronoi] = useState(true);
    const svgRef = useRef(null);
    const xScale = useMemo(
      () =>
        scaleLinear({
          domain: [0, Math.max(...points.map(x))],
          range: [0, xMax],
          clamp: true,
        }),
      [xMax]
    );
    const yScale = useMemo(
      () =>
        scaleLinear({
          domain: [0, Math.max(...points.map(y))],
          range: [yMax, 0],
          clamp: true,
        }),
      [yMax]
    );

    const voronoiLayout = useMemo(
      () =>
        voronoi({
          x: (d) => xScale(x(d)) ?? 0,
          y: (d) => yScale(y(d)) ?? 0,
          width,
          height,
        })(points),
      [width, height, xScale, yScale]
    );

    // event handlers
    const handleMouseMove = useCallback(
      (event) => {
        if (tooltipTimeout) clearTimeout(tooltipTimeout);
        console.log("tooltipLeft");
        if (!svgRef.current) return;

        // find the nearest polygon to the current mouse position
        const point = localPoint(svgRef.current, event);
        if (!point) return;
        const neighborRadius = 100;
        console.log("CLOSEST POINT");
        const closest = voronoiLayout.find(point.x, point.y, neighborRadius);
        console.log(closest);
        if (closest) {
          showTooltip({
            tooltipLeft: xScale(x(closest.data)),
            tooltipTop: yScale(y(closest.data)),
            tooltipData: closest.data,
          });
        }
      },
      [xScale, yScale, showTooltip]
    );

    const handleMouseLeave = useCallback(() => {
      tooltipTimeout = window.setTimeout(() => {
        hideTooltip();
      }, 300);
    }, [hideTooltip]);

    return (
      <div>
        <svg width={width} height={height} ref={svgRef}>
          {/* <GradientPinkRed id="dots-pink" /> */}
          {/** capture all mouse events with a rect */}
          <rect
            width={width}
            height={height}
            rx={14}
            fill="url(#000)"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            onTouchMove={handleMouseMove}
            onTouchEnd={handleMouseLeave}
            onClick={(e) => console.log("RECT SVG CLICKED")}
          />
          <Group
            // pointerEvents="none"
            top={verticalMargin / 2}
            left={HorizontalMargin / 2}
          >
            <GridRows
              scale={yScale}
              width={xMax}
              height={yMax}
              stroke="#e0e0e050"
            />
            <GridColumns
              scale={xScale}
              width={xMax}
              height={yMax}
              stroke="#e0e0e050"
            />
            {/* <line x1={xMax} x2={xMax} y1={0} y2={yMax} stroke="#e0e0e0" /> */}
            <AxisBottom
              top={yMax}
              scale={xScale}
              numTicks={width > 520 ? 10 : 5}
              stroke="#00000050"
              hideTicks
            />
            <AxisLeft scale={yScale} stroke="#00000050" />
            {points.map((point, i) => (
              <Circle
                key={`point-${point[0]}-${i}`}
                className="dot"
                cx={xScale(x(point))}
                cy={yScale(y(point))}
                r={i % 3 === 0 ? 2 : 3}
                fill={tooltipData === point ? "red" : "#026ff0"}
                scale={tooltipData === point ? 1 : 5}
                onMouseLeave={() => {
                  tooltipTimeout = window.setTimeout(() => {
                    hideTooltip();
                  }, 300);
                }}
                onMouseMove={() => {
                  if (tooltipTimeout) clearTimeout(tooltipTimeout);
                  showTooltip({
                    tooltipData: point,
                    tooltipTop: yScale(y(point)),
                    tooltipLeft: xScale(x(point)),
                  });
                }}
              />
            ))}
            {showVoronoi &&
              voronoiLayout.polygons().map((polygon, i) => {
                return (
                  <VoronoiPolygon
                    key={`polygon-${i}`}
                    polygon={polygon}
                    fill="white"
                    stroke="white"
                    strokeWidth={1}
                    strokeOpacity={0.2}
                    fillOpacity={tooltipData === polygon.data ? 0.5 : 0}
                  />
                );
              })}
          </Group>
        </svg>
        {tooltipOpen &&
          tooltipData &&
          tooltipLeft != null &&
          tooltipTop != null && (
            <Tooltip left={tooltipLeft} top={tooltipTop}>
              <div>
                <strong>x:</strong> {x(tooltipData)}
              </div>
              <div>
                <strong>y:</strong> {y(tooltipData)}
              </div>
            </Tooltip>
          )}
      </div>
    );
  }
);

export default function ResponsiveScatter({ points }) {
  console.log(points, "POINTS<<<<")
  return (
    <ParentSize>
      {({ width, height }) => {
        return (
          <ScatterGraph
            width={width || height}
            height={width * 0.5}
            points={points}
          />
        );
      }}
    </ParentSize>
  );
}
