import { readFile } from "node:fs/promises";
import { createRequire } from "node:module";
import satori from "satori";
import sharp from "sharp";
import { type SocialCard, titleSize } from "./socialImage.ts";

const WIDTH = 1200;
const HEIGHT = 630;
const COLORS = { bg: "#0b0b0b", text: "#ececec", muted: "#999999", dim: "#808080", accent: "#b8ff3c" };

type Node = { type: string; props: { style?: Record<string, unknown>; children?: Node | Node[] | string } };

const box = (style: Record<string, unknown>, children: Node | Node[] | string): Node => ({ type: "div", props: { style, children } });

const require = createRequire(import.meta.url);
let fonts: Promise<{ name: string; data: Buffer; weight: 400 | 700; style: "normal" }[]> | undefined;

function loadFonts() {
  fonts ??= Promise.all(
    ([400, 700] as const).map(async (weight) => ({
      name: "Courier Prime",
      data: await readFile(require.resolve(`@fontsource/courier-prime/files/courier-prime-latin-${weight}-normal.woff`)),
      weight,
      style: "normal" as const,
    })),
  );
  return fonts;
}

function layout(card: SocialCard): Node {
  return box(
    {
      width: WIDTH,
      height: HEIGHT,
      display: "flex",
      flexDirection: "column",
      backgroundColor: COLORS.bg,
      color: COLORS.text,
      fontFamily: "Courier Prime",
      padding: "72px 88px 0",
      borderBottom: `8px solid ${COLORS.accent}`,
    },
    [
      box({ display: "flex", alignItems: "center", fontSize: 56, fontWeight: 700 }, [
        box({ color: COLORS.accent }, ">"),
        box({}, "alt"),
        box({ width: 26, height: 46, marginLeft: 6, backgroundColor: COLORS.accent }, ""),
      ]),
      box({ display: "flex", flexDirection: "column", flexGrow: 1, justifyContent: "center" }, [
        box({ color: COLORS.accent, fontSize: 24, letterSpacing: 6, textTransform: "uppercase", marginBottom: 18 }, card.label),
        box({ fontSize: titleSize(card.title), fontWeight: 700, lineHeight: 1.05 }, card.title),
        ...card.lines.map((line) => box({ color: COLORS.muted, fontSize: 34, marginTop: 22 }, line)),
      ]),
      box({ color: COLORS.dim, fontSize: 28, marginBottom: 56 }, "awesome-alternatives.com"),
    ],
  );
}

export async function renderSocialImage(card: SocialCard): Promise<Buffer> {
  const svg = await satori(layout(card) as Parameters<typeof satori>[0], { width: WIDTH, height: HEIGHT, fonts: await loadFonts() });
  return sharp(Buffer.from(svg)).png({ compressionLevel: 9, palette: true }).toBuffer();
}
