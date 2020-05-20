import * as Yup from 'yup';

import { validCpf, validCnpj } from '../../utils/checkDocument';
import InvalidArgumentsError from '../exceptions/InvalidArgumentsError';

export default async (req, res, next) => {
  try {
    const schema = Yup.object().shape({
      name: Yup.string().required('The name field is required.'),
      is_company: Yup.string().required('The is_company field is required.'),
      document: Yup.string().required('The document field is required.'),
      office_id: Yup.number().required('The office_id field is required.'),
      plan_id: Yup.number().required('The plan_id field is required.'),
    });

    await schema.validate(req.body, { abortEarly: false });

    const { is_company, document } = req.body;

    const isCpf = is_company === '0';

    const cpf = validCpf(document);
    const cnpj = validCnpj(document);

    if ((isCpf && !cpf) || (!isCpf && !cnpj)) {
      throw new InvalidArgumentsError();
    }

    return next();
  } catch (err) {
    if (err instanceof InvalidArgumentsError) {
      return res.status(401).json({ error: 'Document invalid' });
    }

    return res
      .status(401)
      .json({ error: 'Field validation failed.', messages: err.inner });
  }
};
