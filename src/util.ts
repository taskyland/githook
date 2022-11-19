import { UrlConfig } from "./types";

export function parseBool(s: string): boolean {
  return ["1", "true", "on", "y", "yes"].includes(s.toLowerCase());
}

function _escapeRegex(pattern: string): string {
  return pattern.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

export function wildcard(pattern: string, target: string): boolean {
  let invert = false;
  if (pattern[0] === "!") {
    invert = true;
    pattern = pattern.slice(1);
  }

  // allow `*` wildcard specifier, translate to `.*` regex;
  // escape everything else
  pattern = pattern.split("*").map(_escapeRegex).join(".*");
  // treat `,` as `|`
  pattern = pattern.replaceAll(",", "|");
  // add anchors
  pattern = `^(${pattern})$`;

  return invert !== new RegExp(pattern).test(target);
}

export function getURLConfig(params: URLSearchParams): UrlConfig {
  const config: UrlConfig = {};
  for (const [key, value] of params) {
    switch (key) {
      case "sig":
        continue;
      case "allowBranches":
        config.allowBranches = value;
        break;
      case "hideTags":
        config.hideTags = parseBool(value);
        break;
      default:
        break;
    }
  }
  return config;
}
