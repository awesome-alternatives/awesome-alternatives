import type { EnrichedTool } from "../../../scripts/lib/types.ts";

export type Verified = Pick<EnrichedTool, "maintainerVerified" | "verifiedAt" | "editedAt">;

export function editedSinceVerification({ maintainerVerified, verifiedAt, editedAt }: Verified): boolean {
  return maintainerVerified && verifiedAt != null && Date.parse(editedAt) > Date.parse(verifiedAt);
}
