import { useEffect, useCallback } from "react";

export const useResizePanel = (ref, direction = "horizontal", options = {}) => {
  const {
    minWidth = 200,
    maxWidth = 800,
    minHeight = 100,
    maxHeight = 400,
    onResize,
    reverse = false,
  } = options;

  const initResize = useCallback(
    (e) => {
      e.preventDefault();
      const startPos = direction === "horizontal" ? e.clientX : e.clientY;
      const startSize =
        direction === "horizontal"
          ? ref.current.offsetWidth
          : ref.current.offsetHeight;

      const handleMouseMove = (e) => {
        const currentPos = direction === "horizontal" ? e.clientX : e.clientY;
        const delta = reverse ? startPos - currentPos : currentPos - startPos;
        let newSize = startSize + delta;

        if (direction === "horizontal") {
          newSize = Math.min(Math.max(newSize, minWidth), maxWidth);
          ref.current.style.width = `${newSize}px`;
        } else {
          newSize = Math.min(Math.max(newSize, minHeight), maxHeight);
          ref.current.style.height = `${newSize}px`;
        }

        onResize?.(newSize);
      };

      const handleMouseUp = () => {
        document.removeEventListener("mousemove", handleMouseMove);
        document.removeEventListener("mouseup", handleMouseUp);
        document.body.style.cursor = "default";
        document.body.style.userSelect = "auto";
      };

      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
      document.body.style.cursor =
        direction === "horizontal" ? "ew-resize" : "ns-resize";
      document.body.style.userSelect = "none";
    },
    [
      direction,
      maxHeight,
      maxWidth,
      minHeight,
      minWidth,
      onResize,
      ref,
      reverse,
    ]
  );

  return initResize;
};
