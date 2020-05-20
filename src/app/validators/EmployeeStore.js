import * as Yup from 'yup';

export default async (req, res, next) => {
  try {
    const schema = Yup.object().shape({
      name: Yup.string().required('The name field is required.'),
      customer_id: Yup.number().required('The customer_id field is required.'),
    });

    await schema.validate(req.body, { abortEarly: false });

    return next();
  } catch (err) {
    return res
      .status(401)
      .json({ error: 'Field validation failed.', messages: err.inner });
  }
};
