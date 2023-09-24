export type ApplicationError = {
  name: string;
  message: string;
};

export type RequestError = {
  status: number;
  data: object | null;
  statusText: string;
  name: string;
  message: string;
};

export type ViaCEPAddressError = {
  error: boolean;
};
export type ReturnCepError = {
  logradouro: string;
  complemento: string;
  bairro: string;
  cidade: string;
  uf: string;
};
export type AddressEnrollment = {
  logradouro: string;
  complemento: string;
  bairro: string;
  cidade: string;
  uf: string;
};
export type Ticket = {
  id: number;
  status: string;
  enrollmentId: number;
  ticketTypeId: number;
  createdAt: Date;
  updatedAt: Date;
};
export type CEP = {
  cep: string;
};
