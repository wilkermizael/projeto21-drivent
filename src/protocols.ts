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

export type ReturnCepError = {
  logradouro: string;
  complemento: string;
  bairro: string;
  cidade: string;
  uf: string;
};

export type TicketType = {
  name: string;
  price: number;
  isRemote: boolean;
  includesHotel: boolean;
};
