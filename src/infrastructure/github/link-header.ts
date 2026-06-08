  export interface ParsedLinkHeader {
    hasNext: boolean;
  }
  
  export function parseGitHubLinkHeader(
    linkHeader: string | null | undefined,
  ): ParsedLinkHeader {
    if (!linkHeader) {
      return { hasNext: false };
    }
  
    return {
      hasNext: /rel="next"/.test(linkHeader),
    };
  }