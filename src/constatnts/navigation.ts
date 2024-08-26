interface IPath {
  to: string;
  title: string;
}

export const pathList: IPath[] = [
  { to: "/characters", title: "Characters" },
  { to: "/locations", title: "Locations" },
  { to: "/episodes", title: "Episodes" },
];
