import { Address, Enrollment } from '@prisma/client';
import { request } from '@/utils/request';
import { invalidCep, invalidDataError } from '@/errors';
import { addressRepository, CreateAddressParams, enrollmentRepository, CreateEnrollmentParams } from '@/repositories';
import { exclude } from '@/utils/prisma-utils';
import { ReturnCepError } from '@/protocols';

// TODO - Receber o CEP por parâmetro nesta função.
async function getAddressFromCEP(cepQuery: string): Promise<ReturnCepError> {
  const cepNoStatic = /^(\d{8}|\d{5}-\d{3})$/.test(cepQuery);
  if (cepNoStatic === false) throw invalidCep('Formato');
  const result = await request.get(`${process.env.VIA_CEP_API}/${cepQuery}/json/`);
  if (result.data.erro) throw invalidCep(`Via Cep`);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { cep, gia, ibge, siafi, ddd, localidade, uf, ...rest } = result.data;
  const cidade = { cidade: result.data.localidade, uf: result.data.uf };
  return { ...rest, ...cidade };
}

async function getOneWithAddressByUserId(userId: number): Promise<GetOneWithAddressByUserIdResult> {
  const enrollmentWithAddress = await enrollmentRepository.findWithAddressByUserId(userId);

  if (!enrollmentWithAddress) throw invalidDataError('Não possui usuário cadastado');

  const [firstAddress] = enrollmentWithAddress.Address;
  const address = getFirstAddress(firstAddress);

  return {
    ...exclude(enrollmentWithAddress, 'userId', 'createdAt', 'updatedAt', 'Address'),
    ...(!!address && { address }),
  };
}

type GetOneWithAddressByUserIdResult = Omit<Enrollment, 'userId' | 'createdAt' | 'updatedAt'>;

function getFirstAddress(firstAddress: Address): GetAddressResult {
  if (!firstAddress) return null;

  return exclude(firstAddress, 'createdAt', 'updatedAt', 'enrollmentId');
}

type GetAddressResult = Omit<Address, 'createdAt' | 'updatedAt' | 'enrollmentId'>;

async function createOrUpdateEnrollmentWithAddress(params: CreateOrUpdateEnrollmentWithAddress) {
  const enrollment = exclude(params, 'address');
  enrollment.birthday = new Date(enrollment.birthday);
  const address = getAddressForUpsert(params.address);
  await getAddressFromCEP(address.cep);

  const newEnrollment = await enrollmentRepository.upsert(params.userId, enrollment, exclude(enrollment, 'userId'));

  await addressRepository.upsert(newEnrollment.id, address, address);
}

function getAddressForUpsert(address: CreateAddressParams) {
  return {
    ...address,
    ...(address?.addressDetail && { addressDetail: address.addressDetail }),
  };
}

export type CreateOrUpdateEnrollmentWithAddress = CreateEnrollmentParams & {
  address: CreateAddressParams;
};

export const enrollmentsService = {
  getOneWithAddressByUserId,
  createOrUpdateEnrollmentWithAddress,
  getAddressFromCEP,
};
