import { Config } from "./types";
import { wildcard } from "./util";

export default async function filter(
  headers: Headers,
  json: any,
  config: Config
): Promise<string | null> {
  const event = headers.get("x-github-event") || "unknown";
  const login: string | undefined = json.sender?.login?.toLowerCase();

  // ignore events that Discord won't render anyway
  if (["status", "pull_request_review_thread"].includes(event)) {
    return event;
  }

  // ignore all PR actions except "opened", "closed", "reopened"
  if (
    event === "pull_request" &&
    json.action &&
    !["opened", "closed", "reopened"].includes(json.action)
  ) {
    return `[PR]: '${json.action}'`;
  }

  // ignore all issue actions except "opened", "deleted", "closed", "reopened", "transferred"
  if (
    event === "issues" &&
    json.action &&
    !["opened", "deleted", "closed", "reopened", "transferred"].includes(
      json.action
    )
  ) {
    return `[issue]: '${json.action}'`;
  }

  // ignore some PR review actions
  if (event === "pull_request_review") {
    // ignore edit/dismiss actions
    if (json.action !== "submitted") return `[PR/review]: '${json.action}'`;

    // if comment (not approval or changes requested), ignore empty review body
    if (json.review?.state === "commented" && !json.review?.body)
      return "[PR/Review]: empty";
  }

  // ignore some PR comment events
  if (event === "pull_request_review_comment") {
    // ignore edit/delete actions
    if (json.action !== "created") return `[PR/comment]: '${json.action}'`;
  }

  // ignore bots
  if ((login && login?.includes("[bot]")) || login?.endsWith("-bot")) {
    return `[bot]: ${login}`;
  }

  let refType: "branch" | "tag" | undefined;
  let ref: string | undefined;
  if (event === "push") {
    // ignore branch/tag push
    const refMatch = /^refs\/([^\/]+)\/(.+)$/.exec(json.ref);
    if (refMatch) {
      refType =
        refMatch[1] === "heads"
          ? "branch"
          : refMatch[1] == "tags"
            ? "tag"
            : undefined;
      ref = refMatch[2];
    }
  } else if (["create", "delete"].includes(event)) {
    // ignore creation/deletion of branch/tag
    refType = json.ref_type;
    ref = json.ref;
  }

  if (refType && ref) {
    if (
      refType == "branch" &&
      config.allowBranches !== undefined &&
      !wildcard(config.allowBranches, ref)
    ) {
      return `branch '${ref}' does not match ${JSON.stringify(
        config.allowBranches
      )}`;
    }
    if (refType == "tag" && config.hideTags === true) {
      return `[tag]: '${ref}'`;
    }
  }

  return null;
}
