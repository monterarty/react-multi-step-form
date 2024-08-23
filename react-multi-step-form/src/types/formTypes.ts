export interface Field {
  MIGX_id: string;
  label: string;
  type: string;
  required: boolean;
  width: string;
  valid: boolean;
}

export interface JsonField {
  MIGX_id: string;
  label: string;
  type: string;
  required: string;
  width: string;
}

export interface Step {
  MIGX_id: string;
  type: string;
  title: string;
  weight: string;
  fields?: Field[];
}
