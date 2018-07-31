export type Endpoint = {
  id: string;
  name: string;
  url: string;
  token: string;
  repos?: Repo[];
};

export type Repo = {
  id: string;
  name: string;
  org: string;
  endpointId?: string;
};
