import * as Yup from 'yup';

export default async (req, res, next) => {
  try {
    const schema = Yup.object().shape({
      name: Yup.string().required('The name field is required.'),
      monthly_cost: Yup.string().required(
        'The monthly cost field is required.',
      ),
    });

    await schema.validate(req.body, { abortEarly: false });

    return next();
  } catch (err) {
    return res
      .status(401)
      .json({ error: 'Field validation failed.', messages: err.inner });
  }
};
