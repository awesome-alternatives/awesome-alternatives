import { useEffect, useState } from "preact/hooks";

export type Remote<T> = { kind: "idle" } | { kind: "loading" } | { kind: "done"; value: T } | { kind: "error" };

export function useRemote<T>(active: boolean, load: (signal: AbortSignal) => Promise<T>): Remote<T> {
  const [opened, setOpened] = useState(active);
  const [state, setState] = useState<Remote<T>>({ kind: "idle" });

  useEffect(() => {
    if (active) setOpened(true);
  }, [active]);

  useEffect(() => {
    if (!opened) return;
    const controller = new AbortController();
    setState({ kind: "loading" });
    load(controller.signal)
      .then((value) => setState({ kind: "done", value }))
      .catch(() => {
        if (!controller.signal.aborted) setState({ kind: "error" });
      });
    return () => controller.abort();
  }, [opened]);

  return state;
}
