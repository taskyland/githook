export interface Config {
  allowBranches?: string;
  hideMessages?: string;
  hideTags?: boolean;
}

declare module "*.html" {
  const value: string;
  export default value;
}
