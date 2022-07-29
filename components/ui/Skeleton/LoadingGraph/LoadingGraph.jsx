import React from "react";
import cn from "classnames";

function LoadingGraph({ animate = true }) {
  return (
    <div class="bg-transparent w-full p-2 sm:p-4 sm:h-64 flex flex-row items-end gap-5 select-none h-52">
      {/* <div
        class={cn("h-3/5 w-1/12 bg-gray-100", { "animate-pulse": animate })}
      ></div>
      <div
        class={cn("h-1/2 w-1/12 bg-gray-100", { "animate-pulse": animate })}
      ></div> */}
      <div
        class={cn("h-2/4 w-1/12 bg-gray-100", { "animate-pulse": animate })}
      ></div>
      <div
        class={cn("h-1/4 w-1/12 bg-gray-100", { "animate-pulse": animate })}
      ></div>
      <div
        class={cn("h-2/5 w-1/12 bg-gray-100", { "animate-pulse": animate })}
      ></div>
      <div
        class={cn("h-2/3 w-1/12 bg-gray-100", { "animate-pulse": animate })}
      ></div>
      <div
        class={cn("h-1/3 w-1/12 bg-gray-100", { "animate-pulse": animate })}
      ></div>
      <div
        class={cn("h-1/6 w-1/12 bg-gray-100", { "animate-pulse": animate })}
      ></div>
      <div
        class={cn("h-1/5 w-1/12 bg-gray-100", { "animate-pulse": animate })}
      ></div>
      <div
        class={cn("h-3/6 w-1/12 bg-gray-100", { "animate-pulse": animate })}
      ></div>
      {/* <div
        class={cn("h-4/6 w-1/12 bg-gray-100", { "animate-pulse": animate })}
      ></div>
      <div
        class={cn("h-full w-1/12 bg-gray-100", { "animate-pulse": animate })}
      ></div> */}
    </div>
  );
}

export default LoadingGraph;
