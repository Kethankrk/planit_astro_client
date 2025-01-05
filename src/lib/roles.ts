export const ValidRoles = {
  VOLUNTEER: "volunteer",
  SPEAKER: "speaker",
} as const;

export type Roles = (typeof ValidRoles)[keyof typeof ValidRoles];
