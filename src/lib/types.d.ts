export interface Config {
  allowBranches?: string;
  hideTags?: boolean;
}

declare module "*.html" {
  const value: string;
  export default value;
}
